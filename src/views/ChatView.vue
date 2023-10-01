<template>
  <div class="gray50">
    <v-container class="fill-height pa-0 py-12">
      <v-row class="no-gutters">
        <v-col
          cols="auto"
          sm="3"
          class="flex-grow-1 flex-shrink-0"
          style="border-right: 1px solid #0000001f"
        >
          <v-responsive class="overflow-y-auto fill-height">
            <v-sheet style="border-radius: 12px" class="pa-4">
              <div class="d-flex align-center">
                <img :src="user.photoUrl" color="grey darken-1" style="width: 50px; height: 50px; border-radius: 100%; border: 1px rgba(0, 0, 0, 0.3) solid; object-fit: contain;">
                <div class="font-weight-medium ml-4">Pesan</div>
              </div>
            </v-sheet>

            <v-divider></v-divider>
            <v-tabs v-model="tab" color="emerald800">
              <v-tab style="text-transform: capitalize; width: 50%">{{
                tabs[0]
              }}</v-tab>
              <v-tab style="text-transform: capitalize">{{ tabs[1] }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-list subheader>
                  <v-list-item-group v-model="selectedItem">
                    <template v-for="(item, index) in data1">
                      <v-list-item :key="`parent${index}`" :value="item">
                        <v-list-item-avatar>
                          <img :src="item.userData.photoUrl" alt="Profile Picture" style="width: 100%; height: 100%; border-radius: 100%; border: 1px rgba(0, 0, 0, 0.3) solid; object-fit: contain;">
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-medium">{{
                            item.userData.name
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider :key="`chatDivider${index}`" class="my-0" />
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-tab-item>

              <v-tab-item>
                <v-list subheader>
                  <v-list-item-group v-model="selectedItem">
                    <template v-for="(item, index) in data2">
                      <v-list-item :key="`parent${index}`" :value="item">
                        <v-list-item-avatar>
                          <img :src="item.userData.photoUrl" alt="Profile Picture" style="width: 100%; height: 100%; border-radius: 100%; border: 1px rgba(0, 0, 0, 0.3) solid; object-fit: contain;">
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-medium">{{
                            item.userData.name
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider :key="`chatDivider${index}`" class="my-0" />
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-tab-item>
            </v-tabs-items>
          </v-responsive>
        </v-col>
        <v-col class="flex-grow-1 flex-shrink-0">
          <v-responsive class="overflow-y-hidden fill-height" height="500">
            <v-card flat class="d-flex flex-column fill-height gray50">
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <template v-for="(msg, i) in messages">
                  <div
                    :class="{ 'd-flex flex-row-reverse': msg.sender == uid }"
                    :key="i"
                  >
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-hover v-slot:default="{ hover }">
                          <v-chip
                            :color="msg.sender == uid ? 'primary' : 'white'"
                            style="
                              max-width: 70%;
                              word-wrap: break-word;
                              height: auto;
                              white-space: normal;
                            "
                            class="pa-4 mb-2"
                            v-on="on"
                          >
                            {{ msg.message }}
                            <v-icon v-if="hover && msg.sender == uid" small
                              >mdi-delete</v-icon
                            >
                          </v-chip>
                        </v-hover>
                      </template>
                      <v-list v-if="msg.sender == uid">
                        <v-list-item style="cursor: pointer">
                          <v-list-item-title @click="deleteMessage(msg)"
                            >Hapus</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </v-card-text>
              <v-card-text class="flex-shrink-1 white">
                <v-text-field
                  v-model="tfSend"
                  label="Tulis Pesan..."
                  type="text"
                  multi-line
                  rows="1"
                  max-rows="6"
                  no-details
                  outlined
                  append-outer-icon="mdi-send"
                  style="border-radius: 12px"
                  @click:append-outer="addReply()"
                  hide-details
                  class="message-input"
                />
              </v-card-text>
            </v-card>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  <script>
import { EventBus } from "@/event-bus";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

import {
  getInvestors,
  getLawFirms,
  getInnovators,
} from "../db/dataRepository.js";
import { getChatroom, sendChat, deleteMessage } from "../db/chatRepository.js";
import { isPitchingExist } from "../db/pitchingRepository.js";
import { firebase } from "../db/firebaseInit.js";
const db = getFirestore(firebase);

export default {
  name: "ChatView",
  data: () => ({
    tfSend: "",
    innovators: [],
    investors: [],
    lawFirms: [],
    tab: null,
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
    selectedItem: 1,
    chatroomData: {},
    currentData: {},
    messages: [],
    tabs: [],
    uid: "",
    data1: [],
    data2: [],
    afterMounted: false,
    user: {},
  }),
  watch: {
    tab() {
      this.getChatroomData();
    },
    selectedItem() {
      this.getChatroomData();
    },
  },
  methods: {
    listenToRealtimeData(id) {
      if (id) {
        const q = query(
          collection(db, "chatRooms", id, "chats"),
          where("deletedAt", "==", null),
          orderBy("createdAt")
        );
        onSnapshot(q, (snapshot) => {
          this.messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
      } else {
        this.messages = [];
      }
    },
    async getChatroomData() {
      if (this.afterMounted) {
        EventBus.$emit("startLoading");
        try {
          var data;
          switch (this.tabs[this.tab]) {
            case "Investor":
              var isExist = false;
              data = this.investors[this.selectedItem];
              if (this.user["role"] == "Inovator" && this.selectedItem != 1) {
                  isExist = await isPitchingExist(
                    this.selectedItem["uid"],
                    this.user["uid"]
                  );
                  if (!isExist && this.selectedItem != 1)
                    throw "Anda belum melakukan pitching ke investor ini.";
                }
              console.log('is exist', isExist);
              break;
            case "Jasa Legalitas":
              data = this.lawFirms[this.selectedItem];
              break;
            case "Inovator":
              data = this.innovators[this.selectedItem];
              break;
          }

          data = this.selectedItem;
          this.currentData = data;
          if (data["uid"]) {
            this.chatroomData = await getChatroom(data["uid"]);
          }
          this.listenToRealtimeData(this.chatroomData["id"]);
        } catch (e) {
          console.log(e);
          EventBus.$emit("showSnackbar", e, false);
        }
        EventBus.$emit("stopLoading");
      }
    },
    addReply() {
      if (this.tfSend && this.selectedItem != 1 && this.chatroomData['uid']) {
        sendChat(this.currentData["uid"], this.tfSend).then((v) => {
          if (v) {
            this.messages = [];
            this.getChatroomData();
          }
        });
        this.tfSend = "";
      }
    },
    deleteMessage(msg) {
      if (msg.sender == this.uid) {
        deleteMessage(this.chatroomData["id"], msg.id);
      }
    },
  },
  async mounted() {
    EventBus.$emit("startLoading");
    try {
      this.role = JSON.parse(localStorage.user);
      this.user = JSON.parse(localStorage.user);
      this.uid = this.role["uid"];
      this.role = this.role["role"];

      if (this.role != "Inovator") {
        this.innovators = await getInnovators(false);
      }
      if (this.role != "Investor") {
        this.investors = await getInvestors(false);
      }
      if (this.role != "Law Firm") {
        this.lawFirms = await getLawFirms(false);
      }

      switch (this.role) {
        case "Inovator":
          this.tabs = ["Investor", "Jasa Legalitas"];
          this.data1 = this.investors;
          this.data2 = this.lawFirms;
          break;
        case "Investor":
          this.tabs = ["Inovator", "Jasa Legalitas"];
          this.data1 = this.innovators;
          this.data2 = this.lawFirms;
          break;
        case "Law Firm":
          this.tabs = ["Inovator", "Investor"];
          this.data1 = this.innovators;
          this.data2 = this.investors;
          break;
      }

      this.afterMounted = true;
      await this.getChatroomData();
    } catch (e) {
      EventBus.$emit("showSnackbar", e, false);
    }
    EventBus.$emit("stopLoading");
  },
};
</script>