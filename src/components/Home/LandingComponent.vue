<template>
  <div style="height: 80vh">
    <v-row class="h-100" justify="center" align="center">
      <v-col cols="auto">
        <img
          src="../../assets/img-landing-left.svg"
          alt="Inovator"
          class="w-100"
        />
      </v-col>
      <v-col align="center" justify="center">
        <h1 class="font-weight-bold header-size">
          Wujudkan Impian Investasi dan Bisnis
        </h1>
        <div class="my-4">
          Menyambungkan Inovator dan Investor tanpa terikat ruang dan waktu agar
          akselerasi solusi inovatif menjadi pulih lebih cepat, bangkit lebih
          kuat.
        </div>
        <RegisterComponent
          :buttonText="'Mulai Sekarang'"
          :isFilledButton="true"
        ></RegisterComponent>
      </v-col>
      <v-col cols="auto">
        <img
          src="../../assets/img-landing-right.svg"
          alt="Investor"
          class="w-100"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "LandingComponent",
  components: {
    RegisterComponent: () => import("../Authentication/RegisterComponent.vue"),
  },
  data: () => ({
    isDialogActive: false,
  }),
};
</script>

<style></style>