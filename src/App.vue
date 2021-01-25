<template>
  <v-app>
    <Encabezado />

    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>


    <!-- -->
    <foot/>
 

  </v-app>
  
</template>

<script>
import Encabezado from "./components/Encabezado";
import foot from "./components/foot";


export default {
  name: "App",

  components: {
    Encabezado,foot,
  },

  data: () => ({
    //
  }),
};
</script>
