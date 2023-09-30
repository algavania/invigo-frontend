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
                    <v-text-field
                      label="Nama"
                      type="text"
                      v-model="name"
                      outlined
                      dense
                    />
                    <v-text-field
                      label="Email"
                      type="email"
                      v-model="email"
                      outlined
                      dense
                    />
                    <v-text-field
                      label="Username"
                      type="text"
                      v-model="username"
                      outlined
                      dense
                    />
                    <div class="d-flex" style="gap: 1rem;">
                        <v-text-field
                            :append-icon="isPasswordObscure ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="isPasswordObscure ? 'password' : 'text'"
                            dense
                            label="Kata Sandi"
                            v-model="password"
                            outlined
                            @click:append="isPasswordObscure = !isPasswordObscure"
                        />
                        <v-text-field
                            :append-icon="isConfirmObscure ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="isConfirmObscure ? 'password' : 'text'"
                            dense
                            label="Konfirmasi"
                            v-model="confirmPassword"
                            outlined
                            @click:append="isConfirmObscure = !isConfirmObscure"
                        />
                    </div>

                    <h6 class="label-size font-weight-bold my-5">
                        Tentang
                    </h6>
                    <v-text-field
                      label="Alamat"
                      type="text"
                      v-model="address"
                      outlined
                      dense
                    />
                    <v-text-field
                      label="Jumlah Investor"
                      type="text"
                      v-model="investorAmount"
                      outlined
                      dense
                    />
                    <v-text-field
                      label="Website"
                      type="text"
                      v-model="website"
                      hint="https://"
                      outlined
                      dense
                    />
                    <v-select
                        label="Industri"
                        :items="['Option 1', 'Option 2', 'Option 3']"
                        outlined
                        dense
                        multiple
                    />
                    <v-text-field
                      label="Penemu"
                      type="text"
                      v-model="ceo"
                      outlined
                      dense
                    />

                    <h6 class="label-size font-weight-bold my-5">
                        Detail
                    </h6>
                    <v-select
                        label="Tipe Investasi"
                        :items="['Option 1', 'Option 2', 'Option 3']"
                        outlined
                        dense
                        multiple
                    />
                    <v-select
                        label="Tahap Investasi"
                        :items="['Option 1', 'Option 2', 'Option 3']"
                        outlined
                        dense
                        multiple
                    />

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
    name: "InovatorProfileView",
    data: () => ({
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
        isPasswordObscure: true,
        isConfirmObscure: true,
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