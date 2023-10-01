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
                <p class="label-size custom-text-button">Syarat & Ketentuan</p>
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
            termsAndAgreements: "/terms-and-agreements"
        }
    })
};
</script>

<style>
.text-color {
    color: rgba(0, 0, 0, 0.87) !important;
}
</style>