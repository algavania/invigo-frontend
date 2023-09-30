<template>
  <div style="height: 72vh" class="mt-4">
    <div class="d-flex justify-center align-center">
      <div style="flex: 2">
        <img
          src="../../assets/img-landing-left.svg"
          alt="Inovator"
          style="width: 100%;"
        />
      </div>
      <div style="flex: 4" class="text-center">
        <h1 class="font-weight-bold header-size">
          Wujudkan Impian Investasi dan Bisnis
        </h1>
        <div class="mt-4 mb-8">
          Menyambungkan Inovator dan Investor tanpa terikat ruang dan waktu agar
          akselerasi solusi inovatif menjadi pulih lebih cepat, bangkit lebih
          kuat.
        </div>
        <RegisterComponent
          :buttonText="'Mulai Sekarang'"
          :isFilledButton="true"
          :isAccentButton="false"
        ></RegisterComponent>
      </div>
      <div style="flex: 2">
        <img
          src="../../assets/img-landing-right.svg"
          alt="Investor"
          style="width: 100%;"
        />
      </div>
    </div>
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