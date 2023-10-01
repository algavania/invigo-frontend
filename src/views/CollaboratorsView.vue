<template>
    <v-container class="mb-6">
        <v-breadcrumbs :items="items" class="ma-0 pa-0">
          <template v-slot:item="{ item }">
              <v-breadcrumbs-item class="label-size" :class="item.disabled
                  ? 'gray500--text'
                  : 'primary--text font-weight-medium'
                  " :href="item.href" :disabled="item.disabled">
                  {{ item.text }}
              </v-breadcrumbs-item>
          </template>
          <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
          </template>
      </v-breadcrumbs>

      <div class="mt-6 mb-8">
          <h6 class="label-size font-weight-bold mb-2">
              {{ items[1].text }}
          </h6>
          <p v-if="userRole == 'Inovator'" class="gray700--text">Investor-investor yang sedang menjalani kerja sama denganmu.</p>
          <p v-else class="gray700--text">Inovator-inovator yang sedang menjalani kerja sama denganmu.</p>
      </div>    

      <v-row>
        <v-col cols="4">
            <p v-if="userRole == 'Inovator'" class="big-body-size ma-0 font-weight-bold">Investor</p>
            <p v-else class="big-body-size ma-0 font-weight-bold">Inovator</p>
        </v-col>
        <v-col cols="2">
            <p class="big-body-size ma-0 font-weight-bold">Tanggal</p>
        </v-col>
        <v-col cols="2">
            <p class="big-body-size ma-0 font-weight-bold">Status</p>
        </v-col>
        <v-col cols="4">
            <p class="big-body-size ma-0 font-weight-bold">Aksi</p>
        </v-col>
      </v-row>

      <div v-for="item in collaborators" :key="item">
        <v-card style="width: 100%;" class="px-4 py-2 mt-4">
            <div class="d-flex align-center">
                <v-col cols="4">
                    <v-row>
                        <div class="collaborator-image rounded mr-2"></div>
                        <p class="big-body-size ma-0 font-weight-bold">{{ item.name }}</p>
                    </v-row>
                </v-col>
                <v-col cols="2">
                    <p class="ma-0">{{ item.approvalDate }}</p>
                </v-col>
                <v-col cols="2">
                    <div v-if="item.isActive" class="tag-container active-tag">
                        <p class="small-body-size font-weight-medium ma-0">Aktif</p>
                    </div>
                    <div v-else class="tag-container ended-tag">
                        <p class="small-body-size font-weight-medium ma-0">Ditutup</p>
                    </div>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        v-if="item.isActive"
                        style="width: fit-content;"
                        height="40"
                        outlined
                        color="primary"
                        class="primary--text"
                        >
                            Ajukan Pemberhentian
                    </v-btn>
                </v-col>
            </div>
        </v-card>
      </div>
    </v-container>
</template>

<script>
export default {
    name: "CollaboratorsView",
    data: () => ({
        items: [
            {
                text: "Beranda",
                disabled: true,
            },
            {
                text: "Kolaborator Investor",
                disabled: false,
            },
        ],
        collaborators: [
        {
                name: "Telkomsel Mitra Inovasi",
                approvalDate: "Jul 28, 2023",
                isActive: true,
            },
            {
                name: "PT. Astra International Tbk",
                approvalDate: "Jul 28, 2023",
                isActive: true,
            },
            {
                name: "Allianz X",
                approvalDate: "Jul 28, 2023",
                isActive: false,
            },
        ],
        userRole: "",
    }),
    mounted()  {
        let user = JSON.parse(localStorage.getItem('user'));
        this.userRole = user.role;        
        if (this.userRole == 'Investor') this.items[1].text = "Kolaborator Inovator"
    }
}
</script>

<style>
.collaborator-image {
    width: 2rem;
    height: 2rem;
    background-color: #064e3b;
}

.tag-container {
    width: fit-content;
    padding:4px 14px;
    border-radius: 0.2rem
}

.active-tag {
    border: 1px #064e3b solid;
    background-color: #ECFDF5;
    color: #064e3b;
}

.ended-tag {
    border: 1px #BE123C solid;
    background-color: #FEF2F2;
    color: #BE123C;
}
</style>