<template>
  <v-app>
    <Encabezado />

    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

 <v-footer app>
    <!-- -->
  </v-footer>

  </v-app>
  
</template>

<script>
import Encabezado from "./components/Encabezado";

export default {
  name: "App",

  components: {
    Encabezado,
  },

  data: () => ({
    //
  }),
};
</script>
