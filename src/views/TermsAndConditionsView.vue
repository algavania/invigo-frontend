<template>
    <v-container>
        <h2 class="subheading-size ma-0 mb-4">
            Syarat & Ketentuan Invigo
        </h2>

        <p class="ma-0">
            Selamat datang di Invigo! Sebelum Anda menggunakan aplikasi kami, harap baca dan pahami syarat dan
            ketentuan penggunaan ini dengan seksama. Penggunaan aplikasi ini mengindikasikan persetujuan Anda terhadap semua
            syarat dan ketentuan yang tercantum di bawah ini.
        </p>

        <div v-for="term in terms" :key="term.title" class="my-10">
            <h6 class="label-size ma-0 mb-3">
                {{ term.title }}
            </h6>
            <div v-for="rule in term.rules" :key="rule.title" class="mb-3">
                <p class="ma-0 font-weight-bold mb-1">
                    {{ rule.title }}
                </p>
                <p class="ma-0">
                    {{ rule.description }}
                </p>
            </div>
        </div>

        <p class="ma-0">
            Terima kasih telah membaca dan memahami syarat dan ketentuan penggunaan Invigo. Kami berharap Anda menikmati
            pengalaman penggunaan aplikasi kami dengan aman dan nyaman.
        </p>
    </v-container>
</template>

<script>
export default {
    name: "TermsAndConditionsView",
    data: () => ({
        terms: [
            {
                title: "1. Penggunaan Aplikasi",
                rules: [
                    {
                        title: "1.1. Kelayakan Penggunaan",
                        description: " Dengan menggunakan Invigo, Anda menyatakan bahwa Anda memiliki kelayakan hukum untuk menggunakan aplikasi ini sesuai dengan hukum yang berlaku di wilayah tempat Anda tinggal.",
                    },
                    {
                        title: "1.2. Pendaftaran Akun",
                        description: "Beberapa fitur aplikasi mungkin memerlukan pendaftaran akun. Informasi yang Anda berikan selama proses pendaftaran harus akurat dan lengkap. Anda bertanggung jawab untuk menjaga keamanan informasi akun Anda."
                    }
                ]
            },
            {
                title: "2. Hak dan Kewajiban Pengguna",
                rules: [
                    {
                        title: "2.1. Hak Pengguna",
                        description: "Anda memiliki hak untuk menggunakan Invigo sesuai dengan tujuannya dan sesuai dengan syarat dan ketentuan ini.",
                    },
                    {
                        title: "2.2. Kewajiban Pengguna",
                        description: "Anda setuju untuk tidak melakukan tindakan apa pun yang dapat merusak atau memengaruhi kinerja atau keamanan Invigo. Penggunaan aplikasi ini harus sesuai dengan hukum yang berlaku dan tidak boleh melanggar hak-hak pihak ketiga.",
                    },
                ]
            },
            {
                title: "3. Privasi dan Keamanan",
                rules: [
                    {
                        title: "3.1. Privasi Pengguna",
                        description: "Kami menghargai privasi Anda. Informasi pribadi yang Anda berikan akan diatur oleh kebijakan privasi kami, yang dapat Anda temukan di halaman Kebijakan Privasi.",
                    },
                    {
                        title: "3.2. Keamanan Akun",
                        description: "Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda dan memberitahukan kami segera jika Anda mencurigai adanya penggunaan yang tidak sah atau akses yang tidak sah ke akun Anda.",
                    }
                ]
            },
            {
                title: "4. Pembatasan Penggunaan",
                rules: [
                    {
                        title: "4.1. Pembatasan Konten",
                        description: "Anda setuju untuk tidak mengunggah, membagikan, atau menyebarkan konten yang ilegal, melanggar hak pihak ketiga, atau merugikan Invigo.",
                    },
                    {
                        title: "4.2. Pembatasan Akses",
                        description: "Kami berhak membatasi atau menghentikan akses Anda ke Invigo jika kami memiliki alasan yang sah untuk meyakini bahwa Anda melanggar syarat dan ketentuan ini."
                    }
                ]
            },
            {
                title: "5. Perubahan pada Syarat dan Ketentuan",
                rules: [
                    {
                        title: "5.1. Perubahan Ketentuan",
                        description: "Kami berhak memperbarui syarat dan ketentuan ini sesuai dengan kebijakan kami tanpa pemberitahuan sebelumnya. Perubahan tersebut berlaku segera setelah diterbitkan. Pastikan untuk memeriksa syarat dan ketentuan ini secara berkala."
                    }
                ]
            },
            {
                title: "6. Pembatalan dan Pengakhiran",
                rules: [
                    {
                        title: "6.1. Pengakhiran Layanan",
                        description: "Kami berhak untuk membatalkan atau mengakhiri layanan kami kepada Anda tanpa pemberitahuan jika kami memiliki alasan yang sah, termasuk pelanggaran terhadap syarat dan ketentuan ini."
                    }
                ]
            },
        ]
    })
}
</script>

<style></style>