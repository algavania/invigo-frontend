<template>
  <v-dialog class="w-75" v-model="dialog" width="75%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="isTextButton"
        variant="text"
        text
        height="50"
        v-bind="attrs"
        v-on="on"
        @click="checkAuth()"
        class="mr-3"
        :ripple="false"
        >Masuk</v-btn
      >
      <p v-else class="small-body-size">
        Sudah memiliki akun?
        <span
          v-bind="attrs"
          v-on="on"
          class="primary--text font-weight-medium hover-pointer-text"
          >Masuk</span
        >
      </p>
    </template>

    <template v-slot:default="{}">
      <v-card>
        <div style="padding: 0">
          <v-row>
            <v-col cols="6" class="bg-green-gradient w-100 pa-0">
              <div style="height: 100%">
                <div
                  id="close-button"
                  @click="dialog = false"
                  class="pa-10 d-flex align-center hover-pointer"
                  style="width: fit-content"
                >
                  <v-icon icon="mdi-close" size="large" color="white" />
                  <p
                    class="label-size font-weight-medium white--text ml-3 mb-1"
                  >
                    Tutup
                  </p>
                </div>
                <div class="h-100 w-100 d-flex align-end justify-end">
                  <img
                    :src="require('@/assets/bg-login.svg')"
                    alt="Background"
                    style="height: 90%"
                  />
                </div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="py-16 px-12 h-100" style="position: relative">
                <p class="label-size font-weight-medium">Masuk Akun</p>
                <div style="position: relative">
                  <p class="small-body-size mt-12 mb-5">
                    Isi formulir di bawah ini.
                  </p>
                  <v-form ref="form">
                    <v-text-field
                      label="Email"
                      type="email"
                      v-model="email"
                      outlined
                      :rules="emailRules"
                      dense
                    />
                    <v-text-field
                      :append-icon="
                        isPasswordObscure ? 'mdi-eye-off' : 'mdi-eye'
                      "
                      :type="isPasswordObscure ? 'password' : 'text'"
                      dense
                      label="Kata Sandi"
                      :rules="passwordRules"
                      v-model="password"
                      outlined
                      @click:append="
                        isPasswordObscure = !isPasswordObscure
                      "
                    />
                    <p
                      class="small-body-size text-right primary--text font-weight-medium hover-pointer-text"
                    >
                      Lupa kata sandi?
                    </p>
                    <div class="w-100 d-flex flex-column">
                      <v-btn
                        @click="login()"
                        class="mt-4 mb-3 w-100"
                        color="primary"
                        height="50"
                        elevation="0"
                        >Masuk Akun</v-btn
                      >
                      <RegisterComponent
                        :buttonText="''"
                        :isFilledButton="false"
                      />
                    </div>
                  </v-form>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { login } from "../../db/auth.js";
import { EventBus } from "../../event-bus.js";

export default {
  name: "LoginComponent",
  components: {
    RegisterComponent: () => import("./RegisterComponent.vue"),
  },
  props: ["isTextButton"],
  data: () => ({
    dialog: false,
    selectedRole: "Inovator",
    isPasswordObscure: true,
    email: "",
    password: "",
    links: {
      dashboard: "/dashboard",
    },
    emailRules: [
      (v) => !!v || "Field harus diisi",
      (v) => /.+@.+\..+/.test(v) || "Email tidak valid",
    ],
    passwordRules: [
      (v) => !!v || "Field harus diisi",
      (v) =>
        (v && v.length >= 8) || "Password kurang lebih harus ada 8 karakter",
    ],
  }),
  methods: {
    checkAuth() {
      this.dialog = false;
      if (localStorage.getItem("user")) {
        if (this.$route.name != "dashboard") {
          this.$router.push({ name: "dashboard" });
        }
        setTimeout(() => {
          this.dialog = false;
        }, 0);
      }
    },
    async login() {
      if (this.$refs.form.validate()) {
        EventBus.$emit("startLoading");
        try {
          await login(this.email, this.password);
          (this.email = ""), (this.password = ""), (this.dialog = false);
          this.$router.push({ name: "dashboard" });
        } catch (e) {
          EventBus.$emit("showSnackbar", e, false);
        }
        EventBus.$emit("stopLoading");
      }
    },
  },
};
</script>

<style></style>