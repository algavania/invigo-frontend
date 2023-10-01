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
          <div v-if="!pitchData['status'] || pitchData['status'] == 'Ditolak' && user['role'] == 'Inovator'">
            <v-btn
              elevation="0"
              color="primary"
              class="pa-6"
              style="width: 100%"
              @click="sendPitching()"
              >Kirim Pitching</v-btn
            >
            <br />
          </div>
          <div v-else>
            <v-btn
              elevation="0"
              color="primary"
              class="pa-6"
              style="width: 100%"
              :to="'/chat'"
              >Kirim Pesan</v-btn
            >
            <br />
          </div>

          <v-btn @click="copyUrl()" elevation="0" outlined class="pa-6 mt-4" style="width: 100%">
            <v-icon left dark> mdi-share-variant </v-icon>

            Bagikan</v-btn
          >
        </v-col>
      </v-row>

      <div v-if="pitchData['status']" class="my-6">
        <h2>Status</h2>
        <div>
          Pitching Anda <strong>{{ pitchData.status }}</strong>
        </div>
      </div>

      <v-row>
        <v-col>
          <h2>Tentang</h2>
          <v-row>
            <div
              class="d-flex mt-10 mr-4 ml-2"
              v-for="data in about"
              :key="data.icon"
            >
              <div class="d-flex align-center">
                <img
                  :src="require(`@/assets/${data.icon}`)"
                  style="width: 1.6rem"
                />
                <div class="ml-2" v-if="data.icon != 'ic-portofolio.svg'">
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
                  Investasi
                </div>
              </div>
            </div>
          </v-row>

          <div>
            <div class="mb-3 label-size mt-12 gray800--text font-weight-medium">
              Industri
            </div>
            <div class="d-flex">
              <v-chip
                v-for="(data, i) in data['industriesData']"
                :key="i"
                :class="i != 0 ? 'ml-3' : ''"
                outlined
                color="emerald800"
                label
                class="font-weight-medium"
                style="
                  background-color: #ecfdf5 !important;
                  border-radius: 8px !important;
                "
              >
                {{ data }}
              </v-chip>
            </div>
          </div>

          <div>
            <div class="mb-2 label-size mt-10 gray800--text font-weight-medium">
              Penemu
            </div>
            <div>{{ data["data"]["creator"] }}</div>
          </div>
        </v-col>
        <v-col>
          <h2>Detail</h2>
          <div class="mb-2 label-size mt-7 gray800--text font-weight-medium">
            Tipe Investasi
          </div>
          <div>{{ data["data"]["typeData"] }}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import { getDataByUsername } from "../db/dataRepository.js";
import { getPitching, addPitching } from "@/db/pitchingRepository";

export default {
  name: "DetailInvestorView",
  data: () => ({
    data: {
      data: {
        typeData: "",
      },
    },
    pitchData: {},
    user: {},
    about: [
      {
        icon: "ic-location.svg",
        text: "",
      },
      {
        icon: "ic-portofolio.svg",
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
        text: "Investor",
        disabled: true,
      },
      {
        text: "",
        disabled: false,
      },
    ],
  }),
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(window.location.href);
      EventBus.$emit("showSnackbar", "Berhasil menyalin link", true);
    },
    async sendPitching() {
      EventBus.$emit("startLoading");
      try {
        await addPitching(this.data["uid"], this.user["uid"]);
        this.pitchData = await getPitching(this.data["uid"], this.user["uid"]);
        EventBus.$emit("showSnackbar", "Pitching berhasil dikirim", true);
      } catch (e) {
        EventBus.$emit("showSnackbar", e, false);
      }
      EventBus.$emit("stopLoading");
    },
  },
  async mounted() {
    EventBus.$emit("startLoading");
    try {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.data = await getDataByUsername(this.$route.params.username);
      this.items[2]["text"] = this.data["name"];

      this.about[0]["text"] = this.data["data"]["address"];
      this.about[1]["text"] = this.data["data"]["totalInvestment"];
      this.about[2]["text"] = this.data["data"]["websiteUrl"];

      if (this.user["role"] == "Inovator") {
        this.pitchData = await getPitching(this.data["uid"], this.user["uid"]);
      }
    } catch (e) {
      EventBus.$emit("showSnackbar", e, false);
    }
    EventBus.$emit("stopLoading");
  },
};
</script>

<style>
</style>