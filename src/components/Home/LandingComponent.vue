<template>
  <div style="height: 80vh;">
    <v-row class="h-100" justify="center" align="center">
      <v-col cols="auto">
        <img src="../../assets/img-landing-left.svg" alt="Inovator" class="w-100">
      </v-col>
      <v-col align="center" justify="center">
        <h1 class="font-weight-bold header-size">Wujudkan Impian Investasi dan Bisnis</h1>
        <div class="my-4">
          Menyambungkan Inovator dan Investor tanpa terikat ruang dan waktu
          agar akselerasi solusi inovatif menjadi pulih lebih cepat, bangkit
          lebih kuat.
        </div>
        <v-dialog class="w-75">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mt-6" color="primary" height="50" elevation="0">Mulai Sekarang</v-btn>
          </template>

          <template v-slot:default="{ isDialogActive }">
            <v-card height="80vh">
              <div style="padding: 0;">
                <v-row>
                  <v-col cols="6">
                    <div class="h-100 bg-green-gradient">

                    </div>
                  </v-col>
                  <v-col cols="6"> <v-btn text="Close Dialog" @click="isDialogActive.value = false"></v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col cols="auto">
        <img src="../../assets/img-landing-right.svg" alt="Investor" class="w-100">
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "LandingComponent",
  data: () => ({
    isDialogActive: false,
  })
};
</script>

<style></style>