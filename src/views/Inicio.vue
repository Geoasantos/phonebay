<template>
  <!--Barra de busqueda y filtros-->
  <div>
    <v-toolbar dense floating class="d-flex justify-end">
      <v-text-field
        label="Buscar"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

      <v-btn icon>
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </v-toolbar>

    <div>
      <ul>
        <li v-for="(anuncio, index) in anuncios" :key="index">
          {{ anuncio.titulo }} - {{ anuncio.id }}

        

          <img height="250" :src="anuncio.images[0]" alt="foto de referencia">
          
        
          

          <router-link :to="{ name: 'Detalles', params: { id: anuncio.id } }">
            <v-btn class="ma-2" color="red" elevation="2">Detalles</v-btn>
          </router-link>
        </li>
      </ul>
    </div>
    <v-btn class="ma-2" color="primary" elevation="2" @click="probar">Detalles</v-btn>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  methods: {
    probar(){
     
},
    ...mapActions(["getAnuncios"]),
  },
  created() {
    this.getAnuncios();

  },
  computed: {
    ...mapState(["anuncios"]),
  },
};
</script>
<style scoped>
</style>