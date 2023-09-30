<template>
  <div>
    <div class="slate50 pa-4" :class="data.title ? 'mt-3' : ''" style="width: 100%; border-radius: 12px">
      <div class="d-flex align-center" style="gap: 1rem;">
        <div class="white rounded-lg pa-3">
          <img v-if="data.type == 'Document'" :src="require(`@/assets/ic-pdf.svg`)"
            style="width: 3.2rem; height: 3.2rem" />
          <img v-if="data.type == 'Link'" :src="require(`@/assets/ic-link.svg`)" style="width: 3.2rem; height: 3.2rem" />
        </div>
        <div class="flex-grow-1" style="margin-bottom: auto;">
          <p v-if="data.type == 'Document'" class="small-body-size ma-0">Dokumen</p>
          <p v-else class="small-body-size ma-0">Tautan</p>
          <p class="font-weight-medium ma-0">{{ data.title }}</p>
        </div>
        <div>
          <v-btn icon>
            <v-icon color="rose700" style="font-size: 1.8rem;">mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "LegalDocumentComponent",
  props: ["data"],
};
</script>
  
<style></style>