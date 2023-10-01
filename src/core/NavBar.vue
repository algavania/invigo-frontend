<template>
  <nav class="pa-0" elevation="0" style="z-index: 100 !important">
    <v-app-bar fixed elevation="0" height="100" color="white" class="pt-1 pb-4">
      <v-container>
        <div class="d-flex">
          <v-col style="position: relative">
            <router-link to="/">
              <img
                :src="require('@/assets/logo_letter.png')"
                alt="Logo"
                height="70%"
                class="d-block"
                style="
                  position: absolute;
                  left: 0;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                "
              />
            </router-link>
          </v-col>
          <v-col class="flex-grow-1 align-center d-flex justify-end">
            <v-toolbar-items class="toolbar-item" v-if="!hasLogin">
              <div v-for="link in links.beforeLogin" :key="link.to">
                <v-btn
                  elevation="0"
                  v-if="link.to != '/coba-sekarang' && link.to != '/masuk'"
                  variant="text"
                  text
                  height="50"
                  :active="$route.path == link.to"
                  class="mr-3"
                  :ripple="false"
                  :to="link.to"
                  >{{ link.text }}</v-btn
                >
                <LoginComponent
                  v-else-if="link.to == '/masuk'"
                  :isTextButton="true"
                />
                <RegisterComponent
                  v-else
                  :buttonText="link.text"
                  :isFilledButton="true"
                ></RegisterComponent>
              </div>
            </v-toolbar-items>
            <v-toolbar-items class="toolbar-item" v-else>
              <div class="d-flex align-center">
                <div class="d-flex">
                  <div v-for="link in links.afterLogin" :key="link.to">
                    <v-btn
                      height="50"
                      :active="$route.path == link.to"
                      class="mr"
                      :ripple="false"
                      elevation="0"
                      :to="link.to"
                      color="white"
                    >
                      <v-icon
                        v-if="$route.path == link.to"
                        class="slate900--text"
                      >
                        {{ link.icon }}
                      </v-icon>
                      <v-icon v-else class="slate500--text">
                        {{ link.icon }}
                      </v-icon>
                    </v-btn>
                  </div>
                </div>

                <v-menu offset-y style="z-index: 101 !important">
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      class="d-flex align-center ml-10 hover-pointer"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <div class="user-profile-picture">
                        <img :src="userPhoto" alt="Profile Picture" width="100%" height="100%" style="object-fit: contain; border-radius: 100%;">
                      </div>
                      <div class="mx-2">
                        <p class="ma-0 font-weight-medium">{{ displayName }}</p>
                        <p class="small-body-size gray700--text ma-0">
                          {{ userName }}
                        </p>
                      </div>
                      <v-icon class="gray300--text">mdi-chevron-down</v-icon>
                    </div>
                  </template>
                  <v-list>
                    <v-list-item
                      class="user-menu hover-pointer"
                      @click="redirectToProfile()"
                    >
                      <v-list-item-title> Profil Saya </v-list-item-title>
                    </v-list-item>
                    <v-list-item class="user-menu hover-pointer" @click="redirectToSubscription()">
                      <v-list-item-title>
                        Berlangganan
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      class="user-menu hover-pointer"
                      @click="logout()"
                    >
                      <v-list-item-title class="rose700--text"
                        >Keluar</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-toolbar-items>
          </v-col>
          <v-app-bar-nav-icon
            class="appbar-icon align-self-center"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      location="right"
      disable-resize-watcher
    >
      <v-list dense v-if="!hasLogin">
        <v-list-item link v-for="link in links.beforeLogin" :key="link.text">
          <v-list-item-content>
            <v-btn
              elevation="0"
              small
              text
              :to="link.to"
              class="font-weight-medium"
              >{{ link.text }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense v-if="hasLogin">
        <v-list-item link v-for="link in links.afterLogin" :key="link.text">
          <v-list-item-content>
            <v-btn small text :to="link.to" class="font-weight-medium">{{
              link.text
            }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import RegisterComponent from "../components/Authentication/RegisterComponent.vue";
import LoginComponent from "../components/Authentication/LoginComponent.vue";
import { EventBus } from "@/event-bus";

export default {
  name: "NavBar",
  components: {
    RegisterComponent,
    LoginComponent,
  },
  data: () => ({
    links: {
      inovatorProfile: "/inovator-profile",
      investorProfile: "/investor-profile",
      firmProfile: "/firm-profile",
      collaborators: "/collaborators",
      beforeLogin: [
        { to: "/", text: "Beranda" },
        // { to: "/layanan", text: "Layanan" },
        { to: "/berlangganan", text: "Berlangganan" },
        { to: "/masuk", text: "Masuk" },
        { to: "/coba-sekarang", text: "Coba Sekarang" },
      ],
      afterLogin: [
        { to: "/dashboard", icon: "mdi-home" },
        { to: "/chat", icon: "mdi-chat" },
        { to: "/notification", icon: "mdi-bell" },
      ],
    },
    drawer: false,
    hasLogin: false,
    displayName: "",
    userName: "",
    userRole: "",
    userPhoto: "",
  }),
  methods: {
    redirectToProfile() {
      if (this.userRole == "Inovator") {
        if (this.$route.name != "inovatorProfile") {
          this.$router.push("/inovator-profile");
        }
      } else if (this.userRole == 'Investor') {
        if (this.$route.name != "investorProfile") {
          this.$router.push("/investor-profile");
        }
      } else if (this.userRole == "Law Firm") {
        if (this.$route.name != "firmProfile") {
          this.$router.push("/firm-profile");
        }
      }
    },
    redirectToSubscription() {
      if (this.$route.name != "/berlangganan") this.$router.push("/berlangganan");
    },
    logout() {
      localStorage.clear();
      EventBus.$emit("triggerCheckLoginToken");
      if (this.$route.path != "/") this.$router.push("/");
    },
    checkLoginToken() {
      this.hasLogin = localStorage.getItem("user") != null;

      if (this.hasLogin) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.userRole = user.role;
        this.displayName = user.name;
        this.userName = user.username;
        this.userPhoto = user.photoUrl;
      }
    },
  },
  mounted() {
    this.checkLoginToken();

    EventBus.$on("triggerCheckLoginToken", () => this.checkLoginToken());
  },
};
</script>

<style scoped>
.v-btn {
  border-bottom: 4px solid transparent;
}

.v-btn--active,
.v-btn:active,
.v-btn:hover {
  border-bottom: 4px solid #064e3b;
  border-radius: 4px !important;
}

.btn-toolbar,
.btn-toolbar:hover {
  border-bottom: none !important;
  border-radius: 12px !important;
}

.appbar-icon {
  display: none;
}

.user-profile-picture {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background: white;
  object-fit: contain;
  border: 1px rgba(0, 0, 0, 0.3) solid;
}

.user-menu:hover {
  background-color: #f3f4f6;
}

@media screen and (max-width: 860px) {
  .logo-img {
    height: 42px;
    width: 42px;
  }

  .toolbar-item {
    display: none;
  }

  .appbar-icon {
    display: initial;
  }
}
</style>