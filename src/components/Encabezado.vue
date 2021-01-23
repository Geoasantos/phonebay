<template>
  <v-app-bar absolute color="#2D4F6C" dark elevate-on-scroll app>
    <v-toolbar color="#2D4F6C">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.xsOnly"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="100"
          height="50"
        />
      </div>

      <v-spacer></v-spacer>
      
      <div v-if="$vuetify.breakpoint.mdOnly || $vuetify.breakpoint.lgOnly || $vuetify.breakpoint.xlOnly">
        <v-btn href="/" class="ma-1" outlined color="white" elevation="2">
          <v-icon>mdi-home</v-icon>Inicio</v-btn
        >
        <v-btn href="/nuevo" class="ma-1" outlined color="white" elevation="2">
          <v-icon>mdi-basket-plus</v-icon>Nuevo Anuncio</v-btn
        >
        <v-btn
          href="/estadisticas"
          class="ma-1"
          outlined
          color="white"
          elevation="2"
        >
          <v-icon>mdi-chart-areaspline</v-icon>Estadisticas</v-btn
        >
        <v-btn
          href="/carrito"
          class="ma-1"
          outlined
          color="white"
          elevation="2"
        >
          <v-icon>mdi-cart-variant</v-icon>Carrito</v-btn
        >
      </div>
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      temporary
      color="#2D4F6C"
    >
      <v-layout mt-4 column aling-center app>
        <v-flex>
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../assets/logo.png"
            transition="scale-transition"
            width="70%"
            height="60%"
          />
        </v-flex>
        <v-list dense>
          <v-list-item link href="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/nuevo">
            <v-list-item-icon>
              <v-icon color="white">mdi-basket-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Nuevo Anuncio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/estadisticas">
            <v-list-item-icon>
              <v-icon color="white">mdi-chart-areaspline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Estadisticas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/carrito">
            <v-list-item-icon>
              <v-icon color="white">mdi-cart-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Carrito</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
  watch: {},
};
</script>

<style>
</style>