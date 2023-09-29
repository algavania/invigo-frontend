<template>
  <div class="gray50">
    <v-container>
      <LandingComponent />
      <FeaturesComponent class="mt-5 mb-16"></FeaturesComponent>
      <div v-for="onboarding in onboardings" :key="onboarding.title">
        <OnboardingComponent :title="onboarding.title" :description="onboarding.description" :image="onboarding.image"
          :isLeft="onboarding.isLeft">

        </OnboardingComponent>
      </div>
    </v-container>
  </div>
</template>

<script>
import LandingComponent from '../components/Home/LandingComponent.vue';
import FeaturesComponent from '../components/Home/FeaturesComponent.vue';
import OnboardingComponent from '../components/Home/OnboardingComponent.vue';

export default {
  name: 'HomeView',
  components: {
    LandingComponent,
    FeaturesComponent,
    OnboardingComponent
  },
  data: () => ({
    onboardings: [
      { title: "Inovator", description: "Memulai kerja sama dengan para investor atau jasa legalitas melalui fitur kirim pesan ataupun kirim patching.", image: "img-onboarding-1.svg", isLeft: true },
      { title: "Investor", description: "Beri dampak positif untuk perkembangan dan pertumbuhan bisnis lokal. Nikmati hasil dana investasi dari inovator.", image: "img-onboarding-2.svg", isLeft: false },
      { title: "Jasa Legalitas", description: "Membantu memastikan bisnis lokal berjalan sesuai dengan hukum yang berlaku dan memberikan perlindungan dalam berbagai aspek.", image: "img-onboarding-3.svg", isLeft: true },
    ],
  }),
}
</script>
