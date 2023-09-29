<template>
  <div>
    Test
    {{ data }}
  </div>
</template>

<script>
import { getDataByUsername } from "../db/dataRepository.js";

export default {
    name: "DefaultView",
    data: () => ({
        data: {},
    }),
    async mounted() {
        this.data = await getDataByUsername(this.$route.params.username);
    },
}
</script>

<style>

</style>