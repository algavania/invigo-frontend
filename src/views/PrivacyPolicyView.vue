<template>
    <v-container>
        <h2 class="subheading-size ma-0 mb-4">
            Kebijakan Privasi Invigo
        </h2>

        <p class="ma-0">
            Selamat datang di Invigo! Kami berkomitmen untuk melindungi privasi Anda dan menghargai kepercayaan yang Anda
            berikan kepada kami. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
            informasi pribadi Anda ketika Anda menggunakan aplikasi kami. Harap baca kebijakan privasi ini dengan seksama
            untuk memahami praktik kami.
        </p>

        <div v-for="policy in policies" :key="policy.title" class="my-10">
            <h6 class="label-size ma-0 mb-3">
                {{ policy.title }}
            </h6>
            <div v-for="rule in policy.rules" :key="rule.title" class="mb-3">
                <p class="ma-0 font-weight-bold mb-1">
                    {{ rule.title }}
                </p>
                <p class="ma-0">
                    {{ rule.description }}
                </p>
            </div>
        </div>

        <p class="ma-0">
            Terima kasih telah memilih Invigo. Kami berkomitmen untuk melindungi privasi Anda.
        </p>
    </v-container>
</template>

<script>
export default {
    name: "PrivacyPolicyView",
    data: () => ({
        policies: [
            {
                title: "1. Informasi yang Kami Kumpulkan",
                rules: [
                    {
                        title: "1.1. Informasi Pribadi",
                        description: "Ketika Anda menggunakan Invigo, kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela, seperti nama, alamat email, nomor telepon, atau informasi identifikasi lainnya.",
                    },
                    {
                        title: "1.2. Informasi Non-Pribadi",
                        description: "Kami juga dapat mengumpulkan informasi non-pribadi, seperti data penggunaan, statistik, dan informasi demografis untuk meningkatkan pengalaman pengguna kami."
                    }
                ]
            },
            {
                title: "2. Bagaimana Kami Menggunakan Informasi Anda",
                rules: [
                    {
                        title: "2.1. Penggunaan Umum",
                        description: "Informasi yang kami kumpulkan dapat digunakan untuk menyediakan, mengelola, dan meningkatkan layanan kami, serta untuk memberikan informasi tentang pembaruan, promosi, atau pemberitahuan lainnya yang berkaitan dengan Invigo.",
                    },
                    {
                        title: "2.2. Analisis Data",
                        description: "Kami dapat menggunakan data non-pribadi untuk analisis statistik, penelitian pasar, dan pengembangan produk agar dapat terus meningkatkan kualitas layanan kami.",
                    },
                    {
                        title: "2.3. Keamanan",
                        description: "Melindungi informasi pribadi Anda adalah prioritas utama kami. Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasional untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.",
                    }
                ]
            },
            {
                title: "3. Bagaimana Kami Berbagi Informasi Anda",
                rules: [
                    {
                        title: "3.1. Pihak Ketiga",
                        description: "Kami tidak akan menyewakan, menjual, atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa izin Anda, kecuali jika diperlukan oleh hukum atau dalam situasi darurat.",
                    },
                    {
                        title: "3.2. Mitra Layanan",
                        description: "Kami dapat bekerja sama dengan mitra layanan untuk memberikan fungsionalitas tertentu dalam aplikasi kami. Mitra ini hanya akan memiliki akses terbatas ke informasi Anda yang diperlukan untuk menyediakan layanan tersebut.",
                    }
                ]
            },
            {
                title: "4. Kontrol atas Informasi Anda",
                rules: [
                    {
                        title: "4.1. Kontrol Penuh",
                        description: "Anda memiliki kontrol penuh atas informasi pribadi Anda. Anda dapat mengakses, memperbarui, atau menghapus informasi pribadi Anda melalui pengaturan aplikasi kami.",
                    },
                ]
            },
            {
                title: "5. Perubahan pada Kebijakan Privasi",
                rules: [
                    {
                        title: "5.1. Perubahan Kebijakan",
                        description: "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu untuk mencerminkan perubahan pada layanan kami atau ketentuan hukum yang berlaku. Perubahan tersebut akan diberlakukan segera setelah diterbitkan. Pastikan untuk memeriksa kebijakan privasi kami secara berkala. Dengan menggunakan Invigo, Anda setuju dengan kebijakan privasi ini. Jika Anda tidak setuju dengan kebijakan ini, mohon untuk tidak menggunakan aplikasi kami.",
                    },
                ]
            },
        ]
    })
}
</script>

<style></style>