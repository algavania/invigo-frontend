<template>
  <div>
    <div class="font-weight-medium gray800--text" v-if="data.title">{{ data.title }}</div>
    <div class="slate50 pa-5" :class="data.title ? 'mt-3' : ''" style="width: 100%; border-radius: 12px">
      <v-row v-if="data.url">
        <v-col cols="2" class="white rounded-lg">
          <img
            :src="require(`@/assets/ic-pdf.svg`)"
            style="width: 100%; height: 3.2rem"
            class="pa-0 my-1"
          />
        </v-col>
        <v-col cols="6">
          <div class="small-body-size">Dokumen</div>
          <div class="font-weight-medium">{{ data.text }}</div>
        </v-col>
        <v-col cols="4">
          <a :href="data.url" class="small-body-size" style="text-align: end"
            >Lihat Selengkapnya</a
          >
        </v-col>
      </v-row>
      <div v-else>Belum ada</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentCardComponent",
  props: ["data"],
};
</script>

<style>
</style>