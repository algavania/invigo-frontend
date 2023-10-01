<template>
    <v-container>
        <div class="d-flex align-center" style="gap: 1.6rem;">
            <div class="flex-grow-1">
                <v-card class="py-10 px-4 text-center rounded-lg d-flex flex-column" height="30rem">
                    <div>
                        <p class="ma-0 font-weight-medium big-body-size">
                            {{ packages.affordable.title }}
                        </p>
                        <p class="ma-0 mt-1">
                            Selama <strong>{{ packages.affordable.duration }}</strong> hanya
                        </p>
                        <h5 class="ma-0 my-8 subheading-size">
                            IDR {{ packages.affordable.price }}
                        </h5>
                        <div class="d-flex flex-column" style="gap: 0.3rem;">
                            <div v-for="benefit in packages.affordable.benefits" :key="benefit" class="align-center">
                                <div class="d-flex text-left" style="gap: 0.5rem;">
                                    <v-icon class="accent800--text">mdi-check</v-icon>
                                    <p class="flex-grow-1 ma-0">{{ benefit }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 d-flex align-end">
                        <v-btn height="50" color="primary" style="width: 100%;" class="mt-10" outlined>
                            Mulai Berlangganan
                        </v-btn>
                    </div>
                </v-card>
            </div>

            <div class="flex-grow-1">
                <v-card class="py-10 px-4 text-center rounded-lg" elevation="3">
                    <p class="ma-0 font-weight-medium big-body-size">
                        {{ packages.premium.title }}
                    </p>
                    <p class="ma-0 mt-1">
                        Selama <strong>{{ packages.premium.duration }}</strong> hanya
                    </p>
                    <h5 class="ma-0 my-8 subheading-size">
                        IDR {{ packages.premium.price }}
                    </h5>
                    <div class="d-flex flex-column" style="gap: 0.3rem;">
                        <div v-for="benefit in packages.premium.benefits" :key="benefit" class="align-center">
                            <div class="d-flex text-left" style="gap: 0.5rem;">
                                <v-icon class="accent800--text">mdi-check</v-icon>
                                <p class="flex-grow-1 ma-0">{{ benefit }}</p>
                            </div>
                        </div>
                    </div>
                    <v-btn height="50" color="primary" style="width: 100%;" class="mt-10">
                        Mulai Berlangganan
                    </v-btn>
                </v-card>
            </div>

            <div class="flex-grow-1">
                <v-card class="py-10 px-4 text-center rounded-lg d-flex flex-column" height="30rem">
                    <div>
                        <p class="ma-0 font-weight-medium big-body-size">
                            {{ packages.intermediate.title }}
                        </p>
                        <p class="ma-0 mt-1">
                            Selama <strong>{{ packages.intermediate.duration }}</strong> hanya
                        </p>
                        <h5 class="ma-0 my-8 subheading-size">
                            IDR {{ packages.intermediate.price }}
                        </h5>
                        <div class="d-flex flex-column" style="gap: 0.3rem;">
                            <div v-for="benefit in packages.intermediate.benefits" :key="benefit" class="align-center">
                                <div class="d-flex text-left" style="gap: 0.5rem;">
                                    <v-icon class="accent800--text">mdi-check</v-icon>
                                    <p class="flex-grow-1 ma-0">{{ benefit }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 d-flex align-end">
                        <v-btn height="50" color="primary" style="width: 100%;" class="mt-10" outlined>
                            Mulai Berlangganan
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "SubscriptionView",
    data: () => ({
        packages: {
            affordable: {
                title: "Terjangkau",
                duration: "1 bulan",
                price: "300K",
                benefits: [
                    "Lihat semua inovator, investor, dan jasa legalitas.",
                    "Hasil pencarian tanpa batas.",
                    "Kirim patching dengan investor.",
                ]
            },
            intermediate: {
                title: "Menengah",
                duration: "6 bulan",
                price: "1600K",
                benefits: [
                    "Lihat semua inovator, investor, dan jasa legalitas.",
                    "Hasil pencarian tanpa batas.",
                    "Kirim patching dengan investor.",
                    "Akses rekomendasi akun."
                ]
            },
            premium: {
                title: "Premium",
                duration: "12 bulan",
                price: "3000K",
                benefits: [
                    "Lihat semua inovator, investor, dan jasa legalitas.",
                    "Hasil pencarian tanpa batas.",
                    "Kirim patching dengan investor.",
                    "Lihat semua inovator, investor, dan jasa legalitas.",
                    "Prioritas bantuan dan pesan",
                ]
            },
        }
    })
}
</script>

<style></style>