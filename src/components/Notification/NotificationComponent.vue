<template>
    <v-card class="w-100 px-8 py-4">
        <div class="d-flex align-center">
            <div class="profile-picture mr-4"></div>
            <div class="flex-grow-1">
                <div class="d-flex align-center">
                    <div v-if="notification.tag != 'none'" class="mr-3">
                        <div v-if="notification.tag == 'Diterima'" class="tag-container accept-tag">
                            <p class="small-body-size font-weight-medium ma-0">{{ notification.tag }}</p>
                        </div>
                        <div v-else-if="notification.tag == 'Ditolak'" class="tag-container reject-tag">
                            <p class="small-body-size font-weight-medium ma-0">{{ notification.tag }}</p>
                        </div>
                        <div v-else class="tag-container process-tag">
                            <p class="small-body-size font-weight-medium ma-0">{{ notification.tag }}</p>
                        </div>
                    </div>
                    <p class="font-weight-medium flex-grow-1 mr-4 my-0">{{ notification.senderName }}</p>
                    <p class="gray500--text small-body-size ma-0">{{ notification.createdAt }}</p>
                </div>
                <p class="gray700--text ma-0 mt-2">{{ notification.description }}</p>
                <div v-if="notification.type != 'notification'" class="mt-4">
                    <v-btn
                        v-if="notification.type == 'pitching acceptance'"
                        class="w-100"
                        color="primary"
                        height="40"
                        elevation="0"
                        style="width: 100%"
                        >
                            Kirim Pesan
                    </v-btn>
                    <v-btn
                        v-else-if="notification.type == 'pitching request'"
                        class="w-100"
                        color="primary"
                        height="40"
                        elevation="0"
                        style="width: 100%"
                        >
                            Ulas Pitching
                    </v-btn>
                    <v-btn
                        v-else
                        class="w-100"
                        color="primary"
                        height="40"
                        elevation="0"
                        style="width: 100%"
                        >
                            Lihat Pesan
                    </v-btn>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "NotificationComponent",
    props: [
        "notification"
    ]
}
</script>

<style>
.profile-picture {
  width: 3rem;
  height: 3rem;
  background-color: #064e3b;
  border-radius: 100%;
}

.tag-container {
    padding: 0 6px;
    border-radius: 0.2rem
}

.accept-tag {
    border: 1px #064e3b solid;
    background-color: #ECFDF5;
    color: #064e3b;
}

.reject-tag {
    border: 1px #BE123C solid;
    background-color: #FEF2F2;
    color: #BE123C;
}

.process-tag {
    border: 1px #64748B solid;
    background-color: #F1F5F9;
    color: #64748B;
}
</style>