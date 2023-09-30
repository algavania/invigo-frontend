<template>
  <v-container class="py-8 px-6 gray50" fluid>
    <v-row>
      <v-col cols="auto">
        <div style="min-height: 50%; border-radius: 12px" class="white pa-4">
          <v-sheet style="border-radius: 12px">
            <div class="d-flex align-center">
              <v-avatar color="grey darken-1" size="50"></v-avatar>
              <div class="font-weight-medium ml-4">Pesan</div>
            </div>
          </v-sheet>

          <v-divider></v-divider>

          <v-tabs v-model="tab" color="emerald800">
            <v-tab style="text-transform: capitalize">Semua</v-tab>
            <v-tab style="text-transform: capitalize">Investor</v-tab>
            <v-tab style="text-transform: capitalize">Jasa Legalitas</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="n in 3" :key="n">
              <div>
                <v-list>
                  <v-list-item v-for="[icon, text] in links" :key="icon" link>
                    <v-list-item-icon>
                      <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
      <v-col>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
export default {
  name: "ChatView",
  data: () => ({
    tab: null,
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
};
</script>