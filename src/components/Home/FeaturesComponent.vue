<template>
    <v-card class="w-100 bg-green-gradient rounded-lg px-12 py-4">
        <div class="relative">
            <v-row align="center">
                <v-col cols="6">
                    <h2 class="subheading-size text-white font-weight-medium">
                        Bingung dengan
                        <span class="bg-primary inline-block rounded" style="padding: 0.1rem 0.3rem;">pengurusan
                            legal</span>
                        dan
                        <span class="bg-primary inline-block rounded" style="padding: 0.1rem 0.3rem;">pendanaan</span>
                        ?
                    </h2>
                    <p class="text-white mt-4 w-75">Memperkenalkan investor dan jasa legalitas yang tersebar di Indonesia.
                    </p>
                </v-col>
                <v-col cols="6">
                    <v-col v-for="feature in features" :key="feature.description"
                        class="w-100 d-flex align-end flex-column">
                        <v-card class="w-75 rounded-lg" elevation="0">
                            <div>
                                <div class="py-8 px-1">
                                    <img :src="require(`@/assets/${feature.image}`)" alt="Feature"
                                        style="width: 1.8rem; height: 1.8rem;">
                                    <p class="font-weight-medium text-accent800 mt-3">{{ feature.description }}</p>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-col>
            </v-row>
            <img src="../../assets/bg-features.svg" alt="Background" class="background-image">
        </div>
    </v-card>
</template>

<script>
export default {
    name: "FeaturesComponent",
    data: () => ({
        features: [
            { image: "ic-feature-cost.svg", description: "Menghemat biaya pengeluaran fasilitas" },
            { image: "ic-feature-facility.svg", description: "Menyediakan fasilitas yang mudah diakses" },
            { image: "ic-feature-location.svg", description: "Dapat diakses di seluruh Indonesia" },
        ],
    }),
};
</script>

<style>
.background-image {
    z-index: -50;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 90%;
}
</style>
