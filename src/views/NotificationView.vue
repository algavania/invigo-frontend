<template>
    <v-container class="my-5 px-8" style="max-width: 40rem;">
        <v-breadcrumbs :items="items" class="ma-0 pa-0">
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

          <div class="mt-6 mb-8">
            <h6 class="label-size font-weight-bold mb-2">
                Notifikasi
            </h6>
            <p class="gray700--text">Pantau proses pitching, pesan terbaru, dan notifikasi lainnya terkait akunmu.</p>
          </div>

          <div class="d-flex flex-column" style="gap: 1.4rem">
            <div v-for="notification in notifications" :key="notification">
                <NotificationComponent :notification="notification" />
            </div>
          </div>
    </v-container>
</template>

<script>
import NotificationComponent from "../components/Notification/NotificationComponent.vue"

export default {
    name: "NotificationView",
    components: {
        NotificationComponent
    },
    data: () => ({
        items: [
          {
              text: "Beranda",
              disabled: true,
          },
          {
              text: "Notifikasi",
              disabled: false,
          },
        ],
        notifications: [
            //type: notification, pitching acceptance, pitching request, new chat
            //tag: Diterima, Ditolak, Diproses, none
            {
                senderName: "East Ventures",
                receiverName: "KerjaYuk",
                tag: "Diterima",
                type: "pitching acceptance",
                description: "Tertarik dengan inovasi Anda, Anda dapat berkirim pesan sekarang.",
                createdAt: "20:15",
            },
            {
                senderName: "East Ventures",
                receiverName: "KerjaYuk",
                tag: "Ditolak",
                type: "notification",
                description: "Memutuskan untuk tidak meneruskan permintaan anda.",
                createdAt: "20:15",
            },
            {
                senderName: "East Ventures",
                receiverName: "KerjaYuk",
                tag: "Diproses",
                type: "notification",
                description: "Pitcing sedang dalam proses. Pantau terus status pitching.",
                createdAt: "20:15",
            },
            {
                senderName: "East Ventures",
                receiverName: "KerjaYuk",
                tag: "none",
                type: "notification",
                description: "Membalas pesan Anda.",
                createdAt: "20:15",
            },
        ],
  }),
}
</script>

<style>
</style>