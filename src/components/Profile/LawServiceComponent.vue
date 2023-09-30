<template>
    <div>
        <div class="slate50 pa-4 mt-3" style="width: 100%; border-radius: 12px">
        <div class="d-flex align-center" style="gap: 1rem;">
          <div class="flex-grow-1" style="margin-bottom: auto;">
            <p class="font-weight-medium ma-0">{{ data.service }}</p>
            <p class="small-body-size ma-0">{{ data.description }}</p>
          </div>
          <div>
            <v-btn icon>
              <v-icon color="rose700" style="font-size: 1.8rem;">mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    name: "LawServiceComponent",
    props: ["data"],
  };
  </script>
    
  <style></style>