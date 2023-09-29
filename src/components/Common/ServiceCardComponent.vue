<template>
    <v-card style="width: 14rem;" class="rounded-lg" :to="{ name: 'detail', params: { username: data['userData']['username'] }}">
        <div class="accent800 w-100" style="height: 11rem;"></div>
        <div class="px-3 py-2">
            <h6 class="big-body-size">{{ data['userData']['name'] }}</h6>
            <p class="gray900--text pt-1">{{ type }}</p>
            <v-row class="w-100 pt-6 px-2">
                <v-col cols="auto" class="pa-0 pr-1" style="margin-top: 3px">
                    <img :src="require(`@/assets/ic-location.svg`)" alt="Feature" style="width: 1.1rem; height: 1.1rem;">
                </v-col>
                <v-col class="pa-0">
                    <p class="gray900--text">{{ data['address'] }}</p>
                </v-col>
            </v-row>
            <v-row class="py-1 px-2 pb-4">
                <v-col cols="auto" class="pa-0 pr-1" style="margin-top: 3px">
                    <img v-if="data['role'] != 'Law Firm'" :src="require(`@/assets/ic-portofolio.svg`)" alt="Feature"
                        style="width: 1.1rem; height: 1.1rem;">
                    <img v-else :src="require(`@/assets/ic-clients.svg`)" alt="Feature"
                        style="width: 1.1rem; height: 1.1rem;">
                </v-col>
                <v-col class="pa-0">
                    <p class="accent800--text font-weight-bold">{{ total }}
                        <span v-if="data['role'] == 'Inovator'" class="gray900--text font-weight-regular"> Investor</span>
                        <span v-else-if="data['role'] == 'Investor'" class="gray900--text font-weight-regular"> Investasi</span>
                        <span v-else class="gray900--text font-weight-regular"> Klien</span>
                    </p>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "ServiceCardComponent",
    props: [
        "data", "type", "total"
    ]
}
</script>

<style></style>