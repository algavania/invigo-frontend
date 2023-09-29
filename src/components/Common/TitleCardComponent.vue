<template>
    <v-card v-if="category == 'Investor'"
        style="height: 24rem; width: 18rem;"
        class="bg-green-gradient rounded-lg">
            <div class="mx-9 my-11">
                <div class="d-flex align-center mb-12">
                    <img :src="require('@/assets/ic-invigo-white.svg')" alt="Icon">
                    <h6 class="big-body-size white--text ml-2">Invigo</h6>
                </div>
                <h2 class="subheading-size white--text font-weight-medium" style="width: 10rem;">
                    Investor Yang Sesuai
                </h2>
            </div>
            <img :src="require(`@/assets/bg-investor-list.svg`)" alt="Background" style="position: absolute; bottom: 0; width: 100%;'">
    </v-card>
    <v-card v-else-if="category == 'Inovator'"
        style="height: 24rem; width: 18rem;"
        class="bg-green-gradient rounded-lg">
            <div class="mx-9 my-11">
                <div class="d-flex align-center mb-12">
                    <img :src="require('@/assets/ic-invigo-white.svg')" alt="Icon">
                    <h6 class="big-body-size white--text ml-2">Invigo</h6>
                </div>
                <h2 class="subheading-size white--text font-weight-medium" style="width: 10rem;">
                    Inovator Pilihan
                </h2>
            </div>
            <img :src="require(`@/assets/bg-inovator-list.svg`)" alt="Background" style="position: absolute; bottom: 0; width: 100%;'">
    </v-card>

    <v-card v-else
        style="height: 24rem; width: 18rem;"
        class="bg-orange-gradient rounded-lg">
            <div class="mx-9 my-11">
                <div class="d-flex align-center mb-12">
                    <img :src="require('@/assets/ic-invigo-white.svg')" alt="Icon">
                    <h6 class="big-body-size white--text ml-2">Invigo</h6>
                </div>
                <h2 class="white--text font-weight-medium" style="font-size: 1.8rem;">
                    Wujudkan Perlindungan & Kepercayaan
                </h2>
            </div>
            <img :src="require(`@/assets/bg-law-firm-list.svg`)" alt="Background" style="position: absolute; bottom: 0; width: 100%;'">
    </v-card>

</template>

<script>
export default {
    name: "TitleCardComponent",
    props: [
        "category"
    ]
}
</script>

<style>
</style>