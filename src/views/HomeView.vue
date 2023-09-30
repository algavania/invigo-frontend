<template>
  <div class="gray50 pb-8">
    <v-container>
      <LandingComponent />
      <FeaturesComponent class="mt-5 mb-16"></FeaturesComponent>
      <div class="pt-2 pb-12">
        <div v-for="onboarding in onboardings" :key="onboarding.title">
          <OnboardingComponent :title="onboarding.title" :description="onboarding.description" :image="onboarding.image"
            :isLeft="onboarding.isLeft">

          </OnboardingComponent>
        </div>
      </div>
      <div class="my-16 bg-orange-gradient rounded-lg d-flex flex-column justify-center align-center text-center"
        style="height: 22rem; position: relative">
        <h2 class="subheading-size white--text font-weight-bold">
          Mulai kembangkan sekarang
        </h2>
        <p class="white--text label-size mt-2 mb-6" style="max-width: 20rem">
          Bergabung dan dapatkan efisiensi kecepatan bisnis Anda.
        </p>
        <RegisterComponent
          :buttonText="'Mulai Sekarang'"
          :isFilledButton="true"
          :isAccentButton="true"
        ></RegisterComponent>
        <img :src="require(`@/assets/bg-dashboard.svg`)" alt="Background"
          style="position: absolute; left: 0; right: 0; margin: auto; height: 100%;" />
      </div>
    </v-container>
  </div>
</template>

<script>
import LandingComponent from '../components/Home/LandingComponent.vue';
import FeaturesComponent from '../components/Home/FeaturesComponent.vue';
import OnboardingComponent from '../components/Home/OnboardingComponent.vue';
import RegisterComponent from '../components/Authentication/RegisterComponent.vue';

export default {
  name: 'HomeView',
  components: {
    LandingComponent,
    FeaturesComponent,
    OnboardingComponent,
    RegisterComponent
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
