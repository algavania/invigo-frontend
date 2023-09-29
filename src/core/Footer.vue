<template>
    <v-container class="my-5">
        <v-row class="align-center">
            <v-col>
                <p class="label-size">Copyright Invigo</p>
            </v-col>
            <v-spacer></v-spacer>
            <div class="d-flex" style="gap: 1.6rem;">
                <p class="label-size custom-text-button">Bantuan</p>
                <p class="label-size custom-text-button">Kebijakan Privasi</p>
                <p class="label-size custom-text-button">Syarat & Ketentuan</p>
            </div>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "FooterSection",
};
</script>

<style>
.custom-text-button {
    text-decoration: underline;
    cursor: pointer;
}
</style>