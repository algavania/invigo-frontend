<template>
    <v-container class="my-8">
        <div class="d-flex" style="gap: 1.5rem;">
            <div>
                <div class="user-profile-picture mb-3 rounded-lg"></div>
                <v-btn color="primary" height="40" elevation="0" style="width: 13rem">
                    Ganti Profil
                </v-btn>
            </div>

            <div class="flex-grow-1" style="max-width: 36rem;">
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

                <div class="mt-6 mb-4 d-flex align-center">
                    <div class="flex-grow-1">
                        <h6 class="label-size font-weight-bold mb-2">
                            Akun
                        </h6>
                        <p class="gray700--text">
                            Tampilkan informasi secara publik.
                        </p>
                    </div>
                    <v-switch color="accent800" v-model="isPublic" inset></v-switch>
                </div>

                <v-form ref="form">
                    <v-text-field label="Nama" type="text" v-model="name" outlined dense />
                    <v-text-field label="Username" type="text" v-model="username" outlined dense />
                    <v-text-field label="Email" type="email" v-model="email" outlined dense disabled />

                    <h6 class="label-size font-weight-bold my-5">
                        Kontak
                    </h6>
                    <v-text-field label="Alamat" type="text" v-model="address" outlined dense />
                    <v-text-field label="Jumlah Klien" type="text" v-model="clientAmount" outlined dense />
                    <v-text-field label="Telepon" type="text" v-model="phone" outlined dense />
                    <v-text-field label="Website" type="text" v-model="website" hint="https://" outlined dense />

                    <h6 class="label-size font-weight-bold my-5">
                        Layanan
                    </h6>
                    <div class="d-flex align-center">
                        <p class="font-weight-medium ma-0 flex-grow-1">Layanan yang ditawarkan</p>
                        <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon color="black" style="font-size: 1.8rem;">mdi-plus</v-icon>
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-title>
                                    <div class="d-flex align-center" style="width: 100%;">
                                        <p class="font-weight-bold ma-0 flex-grow-1">Tambah Layanan</p>
                                        <v-btn icon v-bind="attrs" v-on="on" @click="dialog = false">
                                            <v-icon class="gray500--text" style="font-size: 1.8rem;">mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                </v-card-title>

                                <v-card-text class="mt-6 pb-0">
                                    <v-text-field label="Layanan" type="text" v-model="serviceTitle" outlined dense />
                                    <v-text-field label="Deskripsi" type="text" v-model="serviceDescription" outlined dense />
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn color="primary" height="50" elevation="0" class="flex-grow-1 mb-2"
                                        style="width: 100%;">
                                        Tambah
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>

                    <div class="d-flex mt-6" style="gap: 1rem;">
                        <v-btn color="primary" height="50" elevation="0" class="flex-grow-1">
                            Simpan
                        </v-btn>
                        <v-btn color="rose700" height="50" outlined class="flex-grow-1">
                            Batalkan
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "FirmProfileView",
    data: () => ({
        dialog: false,
        items: [
            {
                text: "Beranda",
                disabled: true,
            },
            {
                text: "Profil",
                disabled: false,
            },
        ],
        isPublic: true,
    })
}
</script>

<style>
.user-profile-picture {
    width: 13rem;
    height: 13rem;
    background-color: #064e3b;
}
</style>