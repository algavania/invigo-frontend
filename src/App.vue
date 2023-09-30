<template>
  <v-app>
    <v-dialog v-model="loading" fullscreen transition="fade-transition">
      <v-container
        fluid
        fill-height
        style="background-color: rgba(255, 255, 255, 0.5)"
      >
        <v-layout justify-center align-center>
          <center>
            <v-row>
              <v-col cols="12">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-col>
            </v-row>
          </center>
        </v-layout>
      </v-container>
    </v-dialog>

    <NavBar />
    <router-view></router-view>
    <FooterSection />
    <v-snackbar :color="color" v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import NavBar from "./core/NavBar.vue";
import FooterSection from "./core/Footer.vue";
import { EventBus } from "./event-bus";

export default {
  name: "App",
  components: {
    NavBar,
    FooterSection,
  },
  data: () => ({
    loading: false,
    snackbar: false,
    text: "",
    timeout: 3000,
    color: "red",
  }),
  mounted() {
    EventBus.$on("showSnackbar", (text, isSuccess) => {
      this.text = text;
      this.color = isSuccess ? 'green' : 'red';
      this.snackbar = true;
    });
    EventBus.$on("startLoading", () => (this.loading = true));
    EventBus.$on("stopLoading", () => {
      this.loading = false;
    });
  },
};
</script>

<style>
* {
  font-family: "Ubuntu", "Roboto", sans-serif !important;
}

.header-size {
  font-size: 3rem;
  line-height: 3.4rem;
}

.subheading-size {
  font-size: 2.2rem;
  line-height: 3rem;
}

.label-size {
  font-size: 1.3rem;
  line-height: 1.4rem;
}

.small-label-size {
  font-size: 1.2rem;
  line-height: 1.4rem;
}

.big-body-size {
  font-size: 1.1rem;
}

.small-body-size {
  font-size: 0.9rem;
}

.v-btn {
  border-radius: 8px !important;
  text-transform: none !important;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.bg-green-gradient {
  background: linear-gradient(
    101deg,
    #064e3b -2.44%,
    #022c22 60.94%
  ) !important;
}

.bg-orange-gradient {
  background: linear-gradient(
    101deg,
    #f97316 -2.44%,
    #ea580c 60.94%
  ) !important;
}

.hover-pointer:hover {
  cursor: pointer;
}

.hover-pointer-text:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>