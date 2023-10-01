<template>
  <div>
    <v-container class="mt-6">
      <v-row>
        <v-col cols="3">
          <div
            style="min-height: 15rem; height: 100%"
          >
          <img :src="data['photoUrl']" alt="Photo" width="100%" height="100%" style="object-fit: contain;" class="pa-4">
        </div>
        </v-col>
        <v-col cols="7">
          <v-breadcrumbs :items="items" class="ma-0 pa-0 mb-4">
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                class="label-size"
                :class="
                  item.disabled
                    ? 'gray500--text'
                    : 'primary--text font-weight-medium'
                "
                :href="item.href"
                :disabled="item.disabled"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
          <div
            style="font-size: 1.2rem"
            class="font-weight-medium gray800--text"
          >
            {{ data["data"]["typeData"] }}
          </div>
          <div class="font-weight-bold gray800--text" style="font-size: 1.8rem">
            {{ data["name"] }}
          </div>
          <div class="gray700--text">{{ data["data"]["description"] }}</div>
        </v-col>
        <v-col>
          <v-btn elevation="0" color="primary" class="pa-6" style="width: 100%"
            >Kirim Pesan</v-btn
          >
          <br />
          <v-btn elevation="0" outlined class="pa-6 mt-4" @click="copyUrl()" style="width: 100%">
            <v-icon left dark> mdi-share-variant </v-icon>

            Bagikan</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2 class="mb-5">Layanan</h2>
          <div
            class="d-flex align-start mt-3"
            v-for="(layanan, i) in data['listLayanan']"
            :key="i"
          >
            <img
              :src="require(`@/assets/ic-check-circle.svg`)"
              style="width: 1.6rem"
            />
            <div class="ml-3">
              <div class="font-weight-medium big-body-size">
                {{ layanan.title }}
              </div>
              <div>{{ layanan.text }}</div>
            </div>
          </div>
        </v-col>
        <v-col>
          <h2>Kontak</h2>
          <div class="d-flex align-center mt-5" v-for="data in contact" :key="data.icon">
            <img
              :src="require(`@/assets/${data.icon}`)"
              style="width: 1.6rem"
            />
            <div class="ml-2" v-if="data.icon != 'ic-people.svg'">
              <a
                :href="data.text"
                target="__blank"
                v-if="data.icon == 'ic-web.svg'"
                class="gray700--text"
                >{{ data.text }}</a
              >
              <div v-else>{{ data.text }}</div>
            </div>
            <div class="ml-2" v-else>
              <span class="emerald800--text font-weight-bold">{{
                data.text
              }}</span>
              Klien
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import { getDataByUsername } from "../db/dataRepository.js";

export default {
  name: "DetailFirmView",
  data: () => ({
    data: {},
    contact: [
      {
        icon: "ic-location.svg",
        text: "",
      },
      {
        icon: "ic-people.svg",
        text: "",
      },
      {
        icon: "ic-phone.svg",
        text: "",
      },
      {
        icon: "ic-email.svg",
        text: "",
      },
      {
        icon: "ic-web.svg",
        text: "",
      },
    ],
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
        text: "",
        disabled: false,
      },
    ],
  }),
  async mounted() {
    EventBus.$emit("startLoading");
    try {
      this.data = await getDataByUsername(this.$route.params.username);
      this.items[2]["text"] = this.data["name"];

      this.contact[0]["text"] = this.data["data"]["address"];
      this.contact[1]["text"] = this.data["data"]["totalClient"];
      this.contact[2]["text"] = this.data["data"]["phone"];
      this.contact[3]["text"] = this.data["email"];
      this.contact[4]["text"] = this.data["data"]["websiteUrl"];
    } catch (e) {
      EventBus.$emit("showSnackbar", e, false);
    }
    EventBus.$emit("stopLoading");
  },
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(window.location.href);
      EventBus.$emit("showSnackbar", "Berhasil menyalin link", true);
    }
  },
};
</script>

<style>
</style>