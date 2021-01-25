<template>
  <!--Barra de busqueda y filtros-->
  <div>
    <v-toolbar  floating class="d-flex">
      <v-row>
      <v-text-field
        label="Buscar"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        v-model="search"
      ></v-text-field>
       

      <v-btn
        icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.xsOnly"
      >
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
      <v-spacer></v-spacer>


      <div
        v-if="
          $vuetify.breakpoint.mdOnly ||
          $vuetify.breakpoint.lgOnly ||
          $vuetify.breakpoint.xlOnly
        "
      >
        <v-btn
          class="ma-1"
          outlined
          color="green"
          elevation="2"
          @click="search = 'Android'"
        >
          <v-icon>mdi-android</v-icon>Android</v-btn
        >

        <v-btn
          class="ma-1"
          outlined
          color="black"
          elevation="2"
          @click="search = 'Ios'"
        >
          <v-icon>mdi-aple</v-icon> Ios
        </v-btn>
        <v-btn
          class="ma-1"
          outlined
          color="#02A5FF"
          elevation="2"
          @click="search = 'Windows'"
        >
          <v-icon>mdi-microsoft-windows</v-icon> Windows
        </v-btn>

        

        <v-btn
          class="ma-1"
          outlined
          color="cyan"
          elevation="2"
          @click="orderprecio"
        >
          Ordenar por precio
          <v-icon v-if="ordenarprecio">mdi-order-numeric-ascending</v-icon>
          <v-icon v-else>mdi-order-numeric-descending</v-icon>
        </v-btn>
        <v-btn
          class="ma-1"
          outlined
          color="cyan"
          elevation="2"
          @click="ordertitulo"
        >
          Ordenar por titulo
          <v-icon v-if="ordenartitulo">mdi-order-alphabetical-ascending</v-icon>
          <v-icon v-else>mdi-order-alphabetical-descending</v-icon>
        </v-btn>
        <br/>
      </div>

      </v-row>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-layout mt-4 column aling-center app>
        <v-list dense>
          <v-list-item @click="orderprecio">
            <v-list-item-icon>
              <v-icon v-if="ordenarprecio">mdi-order-numeric-ascending</v-icon>
              <v-icon v-else>mdi-order-numeric-descending</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Ordenar por precio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="ordertitulo">
            <v-list-item-icon>
              <v-icon v-if="ordenartitulo"
                >mdi-order-alphabetical-ascending</v-icon
              >
              <v-icon v-else>mdi-order-alphabetical-descending</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Ordenar por Titulo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="search='Android'">
            <v-list-item-icon>
              
              <v-icon>mdi-android</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ver dispositivos con Android</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="search='Ios'">
            <v-list-item-icon>
              
              <v-icon>mdi-apple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ver dispositivos con Ios</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="search='Windows'">
            <v-list-item-icon>
              
              <v-icon>mdi-microsoft-windows</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ver dispositivos con Windows</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


        </v-list>
      </v-layout>
    </v-navigation-drawer>
 <br/>
    <div>
      <v-container fliud>
        <v-row dense>
          <v-col
            v-for="(anuncio, index) in anuncios"
            :key="index"
            :cols="cols"
            :class="tamaño()"
            v-show="filtrar(index)"
          >
            <v-card>
              <v-img
                :src="anuncio.images[0]"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="250px"
              >
                <v-card-title
                  v-text="anuncio.titulo"
                  style="font-size: 22px"
                ></v-card-title>
                <v-card-subtitle
                  v-text="'$ ' + anuncio.precio"
                  style="color: white; font-size: 18px"
                ></v-card-subtitle>
              </v-img>

              <v-card-actions class="align-center">
                <v-spacer></v-spacer>
                <router-link
                  :to="{ name: 'Detalles', params: { id: anuncio.id } }"
                >
                  <v-btn class="ma-3" color="primary" elevation="2" large
                    >Detalles</v-btn
                  >
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      cols: 3,
      ordenarprecio: true,
      ordenartitulo: true,
      search: "",
      drawer: false,
    };
  },
  methods: {
    tamaño() {
      if (this.$vuetify.breakpoint.mdOnly) {
        this.cols = 3;
      } else if (this.$vuetify.breakpoint.smOnly) {
        this.cols = 4;
      } else if (this.$vuetify.breakpoint.xsOnly) {
        this.cols = 12;
      }
    },
    menoramayor(a, b) {
      return a.precio - b.precio;
    },
    mayoramenor(a, b) {
      return b.precio - a.precio;
    },
    orderprecio() {
      
      if (this.ordenarprecio == true) {
        this.anuncios.sort(this.menoramayor);
        this.ordenarprecio = false;
      } else {
        this.anuncios.sort(this.mayoramenor);
        this.ordenarprecio = true;
      }
    },

    ordertitulo() {
      if (this.ordenartitulo == true) {
        this.anuncios.sort(function (a, b) {
          return a.titulo.localeCompare(b.titulo);
        });
        this.ordenartitulo = false;
      } else {
        this.anuncios.sort(function (a, b) {
          return b.titulo.localeCompare(a.titulo);
        });

        this.ordenartitulo = true;
      }
    },
    filtrar(valor) {
      if (this.search === "") return true;
      let array = (
        this.anuncios[valor].titulo +
        this.anuncios[valor].precio +
        this.anuncios[valor].descripcion +
        this.anuncios[valor].marca +
        this.anuncios[valor].sistema +
        this.anuncios[valor].pantalla
      ).toUpperCase();
      return array.indexOf(this.search.toUpperCase()) >= 0;
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