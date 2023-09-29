<template>
  <nav class="pa-0">
    <v-toolbar height="100" color="gray50" class="py-4">
      <v-container>
        <v-row>
          <v-col class="d-flex align-start justify-start">
            <v-img
              :src="require('@/assets/logo_letter.png')"
              alt="Logo"
              height="50"
              width="50"
              contain
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col justify-end align-self="center">
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
                />
              </div>
            </v-toolbar-items>
            <v-toolbar-items class="toolbar-item" v-else>
              <div v-for="link in links.afterLogin" :key="link.to">
                <v-btn
                  v-if="link.to != '/berlangganan'"
                  variant="text"
                  text
                  height="50"
                  :active="$route.path == link.to"
                  class="mr-3"
                  :ripple="false"
                  elevation="0"
                  :to="link.to"
                  >{{ link.text }}</v-btn
                >
                <v-btn
                  elevation="0"
                  height="50"
                  :active="$route.path == link.to"
                  class="mr-3 btn-toolbar text-white"
                  :to="link.to"
                  v-else
                >
                  {{ link.text }}
                </v-btn>
              </div>
            </v-toolbar-items>
          </v-col>
          <v-app-bar-nav-icon
            class="appbar-icon align-self-center"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-row>
      </v-container>
    </v-toolbar>

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
              >{{ link.text }}</v-btn
            >
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

export default {
  name: "NavBar",
  components: {
    RegisterComponent,
    LoginComponent,
  },
  data: () => ({
    links: {
      beforeLogin: [
        { to: "/", text: "Beranda" },
        { to: "/layanan", text: "Layanan" },
        { to: "/berlangganan", text: "Berlangganan" },
        { to: "/masuk", text: "Masuk" },
        { to: "/coba-sekarang", text: "Coba Sekarang" },
      ],
      afterLogin: [
        { to: "/", text: "Beranda" },
        { to: "/pesan", text: "Pesan" },
        { to: "/notifikasi", text: "Notifikasi" },
        { to: "/berlangganan", text: "Berlangganan" },
      ],
    },
    drawer: false,
    hasLogin: false,
  }),
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