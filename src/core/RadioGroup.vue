<template>
    <div v-if="isColumn">
        <v-radio-group :v-model="groupModel" inline>
            <div class="pt-1 pb-0 px-2 my-1 radio-container rounded-lg w-100 my-0" v-for="radioValue in values"
                :key="radioValue">
                <v-radio :value="radioValue" color="primary">
                    <template v-slot:label>
                        <p class="text-black">{{ radioValue }}</p>
                    </template>
                </v-radio>
            </div>
        </v-radio-group>
    </div>
    <div v-else>
        <v-radio-group :v-model="groupModel" inline>
            <div class="pt-1 pb-0 px-2 my-1 radio-container rounded-lg w-100 my-0" v-for="radioValue in values"
                :key="radioValue">
                <v-radio :value="radioValue" color="primary">
                    <template v-slot:label>
                        <p class="text-black">{{ radioValue }}</p>
                    </template>
                </v-radio>
            </div>
        </v-radio-group>
    </div>
</template>

<script>
export default {
    name: "RadioGroup",
    props: [
        "groupModel", "values", "isColumn"
    ],
};
</script>

<style>
.radio-container {
    border: 2px solid #E2E8F0;
}
</style>