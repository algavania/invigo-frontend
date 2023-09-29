<template>
  <div>
    <div v-if="isLeft" style="height: 70vh" class="d-flex align-center">
      <v-row align="center">
        <v-col cols="4">
          <h2 class="subheading-size font-weight-medium">
            {{ title }}
          </h2>
          <p class="gray700--text label-size mt-2">
            {{ description }}
          </p>
        </v-col>
        <v-col cols="8" class="d-flex align-end flex-column">
          <img
            :src="require(`@/assets/${image}`)"
            alt="Onboarding"
            style="height: 26rem"
          />
        </v-col>
      </v-row>
    </div>
    <div v-if="!isLeft" style="height: 70vh" class="d-flex align-center">
      <v-row align="center">
        <v-col cols="8">
          <img
            :src="require(`@/assets/${image}`)"
            alt="Onboarding"
            style="height: 26rem"
          />
        </v-col>
        <v-col cols="4">
          <h2 class="subheading-size font-weight-medium">
            {{ title }}
          </h2>
          <p class="gray700--text label-size mt-2">
            {{ description }}
          </p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnboardingComponent",
  props: ["title", "description", "image", "isLeft"],
};
</script>
  
<style></style>