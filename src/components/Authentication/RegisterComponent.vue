<template>
  <v-dialog class="w-75" v-model="dialogVisible" width="75%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="isFilledButton"
        v-bind="attrs"
        v-on="on"
        height="50"
        color="primary"
        @click="checkAuth()"
        class="white--text"
        >{{ buttonText }}</v-btn
      >
      <p v-else class="small-body-size">
        Belum memiliki akun?
        <span
          v-bind="attrs"
          v-on="on"
          class="primary--text font-weight-medium hover-pointer-text"
          >Daftar</span
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
                  @click="closeDialog()"
                  class="pa-10 d-flex align-center hover-pointer"
                  style="width: fit-content"
                >
                  <v-icon large color="white">mdi-close</v-icon>
                  <p
                    class="label-size font-weight-medium white--text ml-3 mb-1"
                  >
                    Tutup
                  </p>
                </div>
                <div class="w-100 d-flex align-end justify-end" style="height: 100%;">
                  <img
                    :src="require('@/assets/bg-login.svg')"
                    alt="Background"
                    style="height: 90%"
                  />
                </div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="py-10 px-12" style="position: relative; height: 100%;">
                <p class="label-size font-weight-medium">Buat Akun Baru</p>
                <div class="slate200 step-indicator d-flex mt-6 mb-8">
                  <div
                    style="flex: 4"
                    class="bg-green-gradient step-indicator"
                    v-if="currentStep == 1"
                  ></div>
                  <div style="flex: 4" class="step-indicator"></div>
                  <div
                    style="flex: 4"
                    class="bg-green-gradient step-indicator"
                    v-if="currentStep == 2"
                  ></div>
                  <div style="flex: 4" class="step-indicator"></div>
                  <div
                    style="flex: 4"
                    class="bg-green-gradient step-indicator"
                    v-if="currentStep == 3"
                  ></div>
                </div>

                <div v-if="currentStep == 1">
                  <p class="small-body-size mb-5">
                    Pilih peran Anda dalam platform ini.
                  </p>
                  <RadioGroup
                    :groupModel="selectedRole"
                    :values="roles"
                    :isColumn="true"
                  />
                  <p class="small-body-size mb-2">
                    Dengan mendaftarkan akun, Anda telah menyetujui
                    <span
                      class="primary--text font-weight-medium hover-pointer-text"
                      >Kebijakan Privasi</span
                    >
                    serta
                    <span
                      class="primary--text font-weight-medium hover-pointer-text"
                      >Syarat & Ketentuan.</span
                    >
                  </p>
                  <v-btn
                    @click="currentStep++"
                    class="mt-16 mb-3"
                    color="primary"
                    height="50"
                    elevation="0"
                    style="width: 100%;"
                    >Buat Akun</v-btn
                  >
                  <LoginComponent :isTextButton="false" />
                </div>

                <div v-else-if="currentStep == 2">
                  <p class="small-body-size mb-5">Isi formulir di bawah ini.</p>
                  <v-form ref="form">
                    <v-text-field
                      v-model="name"
                      :rules="requiredRules"
                      label="Nama"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      type="email"
                      label="Email"
                      outlined
                      dense
                    />
                    <v-text-field
                      label="Nama Pengguna"
                      outlined
                      dense
                    />
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="password"
                          :append-icon="
                            isPasswordObscure ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          :type="isPasswordObscure ? 'password' : 'text'"
                          :rules="passwordRules"
                          dense
                          label="Kata Sandi"
                          outlined
                          @click:append="
                            isPasswordObscure = !isPasswordObscure
                          "
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="confirmPassword"
                          :rules="confirmPasswordRules"
                          :append-icon="
                            isConfirmObscure ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          :type="isConfirmObscure ? 'password' : 'text'"
                          dense
                          label="Konfirmasi"
                          outlined
                          @click:append="
                            isConfirmObscure = !isConfirmObscure
                          "
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                  <p class="small-body-size">
                    Dengan mendaftarkan akun, Anda telah menyetujui
                    <span
                      class="primary--text font-weight-medium hover-pointer-text"
                      >Kebijakan Privasi</span
                    >
                    serta
                    <span
                      class="primary--text font-weight-medium hover-pointer-text"
                      >Syarat & Ketentuan.</span
                    >
                  </p>
                  <v-btn
                    @click="currentStep++"
                    class="mt-4 mb-3 w-100"
                    color="primary"
                    height="50"
                    elevation="0"
                    style="width: 100%;"
                    >Buat Akun</v-btn
                  >
                  <LoginComponent :isTextButton="false" />
                </div>

                <div v-else style="position: relative; height: 100%">
                  <p class="small-body-size mb-5">Sukses Membuat Akun.</p>
                  <p class="small-body-size mb-2">
                    Silakan cek email
                    <span
                      class="primary--text font-weight-medium hover-pointer-text"
                      >blablabla@gmail.com</span
                    >
                    yang telah didaftarkan untuk konfirmasi.
                  </p>
                  <v-btn
                    class="w-100 mt-auto"
                    color="primary"
                    height="50"
                    elevation="0"
                    style="position: absolute; bottom: 5rem; width: 100%;"
                    >Buat Akun</v-btn
                  >
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
import LoginComponent from "../Authentication/LoginComponent.vue";
import RadioGroup from "../../core/RadioGroup.vue";
import { register } from "../../db/auth.js";
import { EventBus } from "../../event-bus.js";

export default {
  name: "RegisterComponent",
  components: {
    RadioGroup,
    LoginComponent,
  },
  props: ["buttonText", "isFilledButton", "isVisible"],
  data: () => ({
    dialogVisible: false,
    currentStep: 1,
    selectedRole: "Inovator",
    roles: ["Inovator", "Investor", "Jasa Legalitas"],
    isPasswordObscure: true,
    isConfirmObscure: true,
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    requiredRules: [(v) => !!v || "Field harus diisi"],
    emailRules: [
      (v) => !!v || "Field harus diisi",
      (v) => /.+@.+\..+/.test(v) || "Email tidak valid",
    ],
    passwordRules: [
      (v) => !!v || "Field harus diisi",
      (v) =>
        (v && v.length >= 8) || "Password kurang lebih harus ada 8 karakter",
    ],
    confirmPasswordRules: [
      (v) => !!v || "Field harus diisi",
      (v) => v === this.password || "Password tidak sama",
    ],
  }),
  methods: {
    checkAuth() {
      this.dialogVisible = false;
      if (localStorage.getItem("user")) {
        if (this.$route.name != "dashboard") {
          this.$router.push({ name: "dashboard" });
        }
        setTimeout(() => {
          this.dialogVisible = false;
        }, 0);
      }
    },
    closeDialog() {
      this.dialogVisible = false;
      this.currentStep = 1;
    },
    async register() {
      if (this.currentStep == 2) {
        if (this.$refs.form.validate()) {
          EventBus.$emit("startLoading");
          try {
            this.name = "";
            this.email = "";
            this.username = "";
            this.password = "";
            this.confirmPassword = "";
            await register(
              this.name,
              this.username,
              this.selectedRole,
              this.email,
              this.password
            );
            this.closeDialog();
          } catch (e) {
            EventBus.$emit("showSnackbar", e, false);
          }
          EventBus.$emit("stopLoading");
        }
      }
    },
  },
};
</script>

<style>
.step-indicator {
  height: 0.4rem;
  border-radius: 1rem;
  width: 100%;
}
</style>