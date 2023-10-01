<template>
    <v-container>
        <div class="text-center mb-16 d-flex flex-column align-center justify-center" style="height: 60vh;">
            <h1 class="text-green-gradient" style="font-size: 3rem;">
                Halaman Tidak Ditemukan
            </h1>
            <p class="label-size ma-0 mt-4" style="max-width: 48rem; line-height: 1.7rem;">
                Hmmm... halaman yang Anda tujui tidak ditemukan. Anda bisa cek kembali alamat yang Anda tuju, atau kembali ke halaman sebelumnya.
            </p>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "PageNotFoundView"
}
</script>

<style>
.text-green-gradient {
    font-size: 72px;
    background: -webkit-linear-gradient(101deg, #064e3b -2.44%, #022c22 60.94%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>