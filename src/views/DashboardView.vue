<template>
  <v-container>
    <div style="height: 18rem; position: relative" class="mt-1">
      <div class="w-100 bg-orange-gradient rounded-lg d-flex flex-column justify-center align-center text-center"
        style="height: 18rem; position: relative">
        <h2 class="subheading-size white--text font-weight-bold">
          Mulai kembangkan sekarang
        </h2>
        <p class="white--text label-size mt-2" style="max-width: 20rem">
          Bergabung dan dapatkan efisiensi kecepatan bisnis Anda.
        </p>
        <img :src="require(`@/assets/bg-dashboard.svg`)" alt="Background"
          style="position: absolute; left: 0; right: 0; margin: auto" />
      </div>
      <!-- <v-card style="height: 4rem; max-width: 35rem" class="search-card" outlined></v-card> -->
    </div>

    <div class="mt-16 pt-4" v-if="role != 'Investor'">
      <v-row class="align-center">
        <h6 class="label-size font-weight-bold mr-10 mb-1">
          Rekomendasi Investor
        </h6>
        <div class="d-flex align-center">
          <router-link :to="links.investors" style="text-decoration: none">
            <p class="big-body-size primary--text font-weight-bold ma-0 mb-1 mr-1 hover-pointer">
              Lihat Semua
            </p>
          </router-link>
          <v-icon class="primary--text">mdi-chevron-right</v-icon>
        </div>
      </v-row>
      <v-row class="mt-10 align-center" style="position: relative; overflow: hidden">
        <TitleCardComponent category="Investor" />
        <v-slide-group class="w-100" style="height: 22rem; position: absolute; left: 16rem">
          <div class="d-flex" style="gap: 0.4rem">
            <v-slide-item v-for="data in investors" :key="data.uid">
              <ServiceCardComponent :routeName="'detailInvestor'" :data="data" :total="data['totalInvestment']"
                :type="data['typeData']" />
            </v-slide-item>
          </div>
        </v-slide-group>
      </v-row>
    </div>

    <div class="mt-16 pt-4" v-if="role != 'Inovator'">
      <v-row class="align-center">
        <h6 class="label-size font-weight-bold mr-10 mb-1">
          Rekomendasi Inovator
        </h6>
        <div class="d-flex align-center">
          <router-link :to="links.innovators" style="text-decoration: none">
            <p class="big-body-size primary--text font-weight-bold ma-0 mb-1 mr-1 hover-pointer">
              Lihat Semua
            </p>
          </router-link>
          <v-icon class="primary--text">mdi-chevron-right</v-icon>
        </div>
      </v-row>
      <v-row class="mt-10 align-center" style="position: relative; overflow: hidden">
        <TitleCardComponent category="Inovator" />
        <v-slide-group class="w-100" style="height: 22rem; position: absolute; left: 16rem">
          <div class="d-flex" style="gap: 0.4rem">
            <v-slide-item v-for="data in innovators" :key="data.uid">
              <ServiceCardComponent :routeName="'detailInovator'" :data="data" :total="data['totalInvestor']"
                :type="data['investData']" />
            </v-slide-item>
          </div>
        </v-slide-group>
      </v-row>
    </div>

    <div class="mt-16 pt-4 mb-12" v-if="role != 'Law Firm'">
      <v-row class="align-center">
        <h6 class="label-size font-weight-bold mr-10 mb-1">
          Rekomendasi Jasa Legalitas
        </h6>
        <div class="d-flex align-center">
          <router-link :to="links.lawFirms" style="text-decoration: none">
            <p class="big-body-size primary--text font-weight-bold ma-0 mb-1 mr-1 hover-pointer">
              Lihat Semua
            </p>
          </router-link>
          <v-icon class="primary--text">mdi-chevron-right</v-icon>
        </div>
      </v-row>
      <v-row class="mt-10 align-center" style="position: relative; overflow: hidden">
        <TitleCardComponent category="Law Firm" />
        <v-slide-group class="w-100" style="height: 22rem; position: absolute; left: 16rem">
          <div class="d-flex" style="gap: 0.4rem">
            <v-slide-item v-for="data in lawFirms" :key="data.uid">
              <ServiceCardComponent :routeName="'detailLawFirm'" :data="data" :total="data['totalClient']"
                :type="data['typeData']" />
            </v-slide-item>
          </div>
        </v-slide-group>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { EventBus } from "@/event-bus";
import ServiceCardComponent from "../components/Common/ServiceCardComponent.vue";
import TitleCardComponent from "../components/Common/TitleCardComponent.vue";
import {
  getInvestors,
  getLawFirms,
  getInnovators,
} from "../db/dataRepository.js";

export default {
  name: "DashboardView",
  components: {
    ServiceCardComponent,
    TitleCardComponent,
  },
  data: () => ({
    innovators: [],
    investors: [],
    lawFirms: [],
    role: "",
    links: {
      innovators: "/innovators",
      investors: "/investors",
      lawFirms: "/law-firms",
    }
  }),
  async mounted() {
    EventBus.$emit("startLoading");
    try {
      this.role = JSON.parse(localStorage.user);
      this.role = this.role["role"];
      if (this.role != "Inovator") {
        this.innovators = await getInnovators(5);
      }
      if (this.role != "Investor") {
        this.investors = await getInvestors(5);
      }
      if (this.role != "Law Firm") {
        this.lawFirms = await getLawFirms(5);
      }
    } catch (e) {
      EventBus.$emit("showSnackbar", e, false);
    }
    EventBus.$emit("stopLoading");
  },
};
</script>

<style>
.v-slide-group .v-slide-group__next,
.v-slide-group .v-slide-group__prev {
  display: none;
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