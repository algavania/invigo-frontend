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
          <div v-if="user['role']">
            <div v-if="pitchData['status'] == 'Diproses'">
              <v-btn
                elevation="0"
                color="primary"
                class="pa-6 mt-3"
                style="width: 100%"
                @click="updatePitching('Diterima')"
                >Terima</v-btn
              >
              <v-btn
                elevation="0"
                color="primary"
                class="pa-6 mt-3 mb-3"
                outlined
                @click="updatePitching('Ditolak')"
                style="width: 100%"
                >Tolak</v-btn
              >
              <br>
              <br>
            </div>
            <v-btn
              v-if="data['username'] != user['username']"
              elevation="0"
              color="primary"
              class="pa-6"
              style="width: 100%"
              >Kirim Pesan</v-btn
            >
          </div>
          <br v-if="data['username'] != user['username'] && user['role'] != 'Investor'" />
          <v-btn @click="copyUrl()" elevation="0" outlined class="pa-6 mt-4" style="width: 100%">
            <v-icon left dark> mdi-share-variant </v-icon>

            Bagikan</v-btn
          >
        </v-col>
      </v-row>

      <div v-if="pitchData['status']" class="my-6">
        <h2>Status</h2>
        <div>
          Kerja Sama <strong>{{ pitchData.status }}</strong>
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
                  Investor
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
          <div class="mb-2 label-size mt-7 gray800--text font-weight-medium">
            Tahap Investasi
          </div>
          <div>{{ data["data"]["fundingType"] }}</div>
        </v-col>
      </v-row>

      <div class="mt-8" v-if="data['role'] != 'Law Firm'">
        <h2 class="mb-4">Dokumen</h2>
        <v-row>
          <v-col v-for="data in documents" :key="data.text" cols="6">
            <DocumentCardComponent :data="data" />
          </v-col>
        </v-row>
      </div>

      <div class="mt-8">
        <h2 class="mb-4">Dokumen Legal</h2>
        <v-row v-if="data['legalDocs'].length > 0">
          <v-col v-for="data in data['legalDocs']" :key="data.text" cols="6">
            <DocumentCardComponent :data="data" />
          </v-col>
        </v-row>
        <div v-else>Belum ada dokumen legal yang di-upload</div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import { getDataByUsername } from "../db/dataRepository.js";
import DocumentCardComponent from "@/components/Detail/DocumentCardComponent.vue";
import { getPitching, updatePitching } from "@/db/pitchingRepository";

export default {
  name: "DetailInovatorView",
  components: {
    DocumentCardComponent,
  },
  data: () => ({
    data: {},
    documents: [],
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
    pitchData: {},
    items: [
      {
        text: "Beranda",
        disabled: true,
      },
      {
        text: "Inovator",
        disabled: true,
      },
      {
        text: "",
        disabled: false,
      },
    ],
    user: {},
  }),
  async mounted() {
    this.refreshPage();
  },
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(window.location.href);
      EventBus.$emit("showSnackbar", "Berhasil menyalin link", true);
    },
    async updatePitching(status) {
      EventBus.$emit("startLoading");
      try {
        await updatePitching(this.pitchData["id"], status, this.data['uid'], this.user['uid']);
        await this.refreshPage();
      } catch (e) {
        EventBus.$emit("showSnackbar", e, false);
      }
      EventBus.$emit("stopLoading");
    },
    async refreshPage() {
      EventBus.$emit("startLoading");
      try {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.data = await getDataByUsername(this.$route.params.username);
        this.items[2]["text"] = this.data["name"];

        this.about[0]["text"] = this.data["data"]["address"];
        this.about[1]["text"] = this.data["data"]["totalInvestor"];
        this.about[2]["text"] = this.data["data"]["websiteUrl"];

        const name = this.data["name"];
        this.documents = [
          {
            title: "Proposal Bisnis",
            text: "Proposal " + name,
            url: this.data["data"]["proposalUrl"],
          },
          {
            title: "Pitch Deck",
            text: "Pitch Deck " + name,
            url: this.data["data"]["pitchDeckUrl"],
          },
          {
            title: "Demo Produk",
            text: "Demo Produk " + name,
            url: this.data["data"]["productDemoUrl"],
          },
          {
            title: "Business Model Canvas",
            text: "BMC " + name,
            url: this.data["data"]["bmcUrl"],
          },
        ];
        if (this.user["role"] == "Investor") {
          this.pitchData = await getPitching(
            this.user["uid"],
            this.data["uid"]
          );
        }
      } catch (e) {
        EventBus.$emit("showSnackbar", e, false);
      }
      EventBus.$emit("stopLoading");
    },
  },
};
</script>

<style>
</style>