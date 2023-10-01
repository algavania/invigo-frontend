<template>
    <v-container class="my-5 px-8">
        <v-breadcrumbs :items="items" class="ma-0 pa-0">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item class="label-size" :class="item.disabled
                    ? 'gray500--text'
                    : 'primary--text font-weight-medium'
                    " :href="item.href" :disabled="item.disabled">
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <div class="mt-6 mb-8">
            <h6 class="label-size font-weight-bold mb-2">
                Rekomendasi Jasa Legalitas
            </h6>
            <p class="gray700--text">Saran jasa legalitas yang sesuai dengan industri bisnis Anda.</p>

            <v-row class="mt-4">
                <v-col cols="3" v-for="data in lawFirms" :key="data.uid">
                    <ServiceCardComponent :routeName="'detailLawFirm'" :data="data" :total="data['totalClient']"
                :type="data['typeData']" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { EventBus } from "@/event-bus";
import ServiceCardComponent from '@/components/Common/ServiceCardComponent.vue';
import {
    getLawFirms,
} from "../db/dataRepository.js";

export default {
    name: "LawFirmsView",
    components: {
        ServiceCardComponent
    },
    data: () => ({
        lawFirms: [],
        items: [
            {
                text: "Beranda",
                disabled: true,
            },
            {
                text: "Jasa Legalitas",
                disabled: true,
            },
            {
                text: "Rekomendasi Jasa Legalitas",
                disabled: false,
            },
        ],
    }),
    async mounted() {
        EventBus.$emit("startLoading");
        try {
            this.lawFirms = await getLawFirms(false);
        } catch (e) {
            EventBus.$emit("showSnackbar", e, false);
        }
        EventBus.$emit("stopLoading");
    },

}
</script>

<style></style>