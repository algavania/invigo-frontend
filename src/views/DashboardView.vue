<template>
  <v-container>
    <div style="height: 20rem; position: relative" class="my-1">
      <div
        class="w-100 bg-orange-gradient rounded-lg d-flex flex-column justify-center align-center text-center"
        style="height: 18rem; position: relative"
      >
        <h2 class="subheading-size text-white font-weight-medium">
          Mulai kembangkan sekarang
        </h2>
        <p class="text-white label-size mt-2" style="max-width: 20rem">
          Bergabung dan dapatkan efisiensi kecepatan bisnis Anda.
        </p>
        <img
          :src="require(`@/assets/bg-dashboard.svg`)"
          alt="Background"
          class="background-image"
        />
      </div>
      <v-card
        style="height: 4rem; max-width: 35rem"
        class="search-card"
        elevation="0"
      ></v-card>
    </div>
    <v-row class="mt-10">
      <v-slide-group class="w-100">
        <v-slide-group-item v-for="data in investors" :key="data.uid">
          <ServiceCardComponent
            :data="data"
            :total="data['totalInvestments']"
            :type="data['typeData']"
            class="mr-5"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-row>
    <v-row class="mt-10">
      <v-slide-group class="w-100" show-arrows="never">
        <v-slide-group-item v-for="data in lawFirms" :key="data.uid">
          <ServiceCardComponent
            :data="data"
            :total="data['totalClient']"
            :type="data['typeData']"
            class="mr-5"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-row>
  </v-container>
</template>
<script>
import ServiceCardComponent from "../components/Common/ServiceCardComponent.vue";
import { getInvestors, getLawFirms } from "../db/dataRepository.js";

export default {
  name: "DashboardView",
  components: {
    ServiceCardComponent,
  },
  data: () => ({
    innovators: [],
    investors: [],
    lawFirms: [],
  }),
  async mounted() {
    this.investors = await getInvestors(5);
    this.lawFirms = await getLawFirms(5);
  },
};
</script>


<style>
.v-slide-group .v-slide-group__next,
.v-slide-group .v-slide-group__prev {
  display: none;
}

.background-image {
  z-index: -50;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.search-card {
  z-index: 50;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #cbd5e1;
}
</style>