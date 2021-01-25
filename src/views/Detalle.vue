<template>
  <div>
    <h1>{{ anuncio.titulo }} ${{ anuncio.precio }}</h1>

    <v-divider></v-divider>
    <br/>
    <v-row>
      
      <v-col class="col-md-6 col-12">
        
          <v-carousel
            height="400"
            width="563"
            hide-delimiter-background
            show-arrows-on-hover
            cycle
          >
            <v-carousel-item v-for="(item, i) in anuncio.images" :key="i">
              <img :src="item" style="height: 100%; width: 563;" />
            </v-carousel-item>
          </v-carousel>
        <br/>

        <v-card elevation="13" width="563">
          <v-card-text>
            <v-row>
              <v-icon color="black">mdi-text-box</v-icon>
              <h4>Descripcion</h4>
            </v-row>
            <v-row> {{ anuncio.descripcion }}</v-row>
          </v-card-text>
          <v-card-actions>
            
          </v-card-actions>
        </v-card>

        <br />

         <v-card elevation="13" width="563">
          <v-card-title >
            <v-icon>mdi-card-account-details</v-icon>
            Informacion del vendendor</v-card-title
          >

          <v-card-text>
            <br/>
            <div>
              <v-row>
                <v-col>
                  <v-row>
                  <v-icon>mdi-account</v-icon>
                  <h3>{{ anuncio.vendedor }}</h3>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row>
                  <v-icon>mdi-phone</v-icon>
                  <h3>{{anuncio.tel}}</h3>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions></v-card-actions>


        </v-card>

       

      </v-col>

      <v-col>

        <v-card elevation="13" width="563">
          <v-card-title>
            <v-icon>mdi-cellphone-information</v-icon>
            Especificaciones Tecnicas</v-card-title
          >
          <v-card-text>
            <ul>
              <li>
                <v-icon color="black">mdi-layers-triple</v-icon>Marca:
                {{ anuncio.marca }}
              </li>
              <li>
                <v-icon color="black">mdi-cellphone</v-icon>Modelo:
                {{ anuncio.modelo }}
              </li>
              <li>
                <v-icon color="black">mdi-bookmark-multiple</v-icon>Estado:
                {{ anuncio.estado }}
              </li>
              <li>
                <v-icon color="black">mdi-cellphone-screenshot</v-icon>Pantalla:
                {{ anuncio.pantalla }}
              </li>
              <li>
                <v-icon color="black">mdi-android</v-icon>Sistema:
                {{ anuncio.sistema }}
              </li>
              <li>
                <v-icon color="black">mdi-chip</v-icon>RAM: {{ anuncio.ram }}
              </li>
              <li>
                <v-icon color="black">mdi-memory</v-icon>ROM: {{ anuncio.rom }}
              </li>
            </ul>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.getAnuncio(this.id);
  },
  methods: {
    ...mapActions(["getAnuncio"]),
  },
  computed: {
    ...mapState(["anuncio"]),
  },
};
</script>
<style scoped>
</style>