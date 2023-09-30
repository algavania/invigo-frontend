<template>
    <div class="mb-6">
        <p class="font-weight-bold ma-0 black--text">{{ label }}</p>
        <p v-if="description != ''" class="gray700--text ma-0">{{ description }}</p>
        <div class="w-100 field-border pt-10 pb-6 mt-2 d-flex align-center justify-center">
            <div class="hover-pointer text-center" style="width: fit-content; height: fit-content;">
                <img :src="require('@/assets/ic-upload-file.svg')" alt="Background" />
                <p class="font-weight-medium">Unggah File</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FileUploadComponent",
    props: [
        "label", "description"
    ]
}
</script>

<style>
.field-border {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 6px;
}
</style>