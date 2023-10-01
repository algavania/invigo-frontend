<template>
    <v-container class="my-5">
        <v-row class="align-center">
            <v-col>
                <p class="label-size">Copyright Invigo</p>
            </v-col>
            <v-spacer></v-spacer>
            <div class="d-flex" style="gap: 1.6rem;">
                <router-link :to="links.privacyPolicy" class="label-size text-color">
                    Kebijakan Privasi
                </router-link>
                <router-link :to="links.termsAndCondiitons" class="label-size text-color">
                    Syarat & Ketentuan
                </router-link>
            </div>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "FooterSection",
    data: () => ({
        links: {
            privacyPolicy: "/privacy-policy",
            termsAndCondiitons: "/terms-and-conditions"
        }
    })
};
</script>

<style>
.text-color {
    color: rgba(0, 0, 0, 0.87) !important;
}
</style>