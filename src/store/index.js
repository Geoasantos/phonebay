import Vue from "vue";
import Vuex from "vuex";
import { db, storage } from "../firebase.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    anuncios: [],
    anuncio: {},
  },
  mutations: {
    setAnuncios(state, payload) {
      state.anuncios = payload;
    },
    setAnuncio(state, payload) {
      state.anuncio = payload;
    },
  },
  actions: {
    getAnuncios({ commit }) {
      const anuncios = [];

      db.collection("anuncios")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let anuncio = doc.data();
            anuncio.id = doc.id;
            const enlaces = [];

            const storageRef = storage.ref();

            const imagesRef = storageRef.child(`${anuncio.id}/`);

            imagesRef.listAll().then(function(resi) {
              resi.items.forEach(function(imaRef) {
                imaRef.getDownloadURL().then((url) => {
                  let enlace = url;
                  enlaces.push(enlace);
                });
              });
            });
            anuncio.images = enlaces;

            anuncios.push(anuncio);
          });
          commit("setAnuncios", anuncios);
        });
    },

    getAnuncio({ commit }, idAnuncio) {
      db.collection("anuncios")
        .doc(idAnuncio)
        .get()
        .then((res) => {

          let anuncio = res.data();
          anuncio.id = res.id;


          const enlaces = [];

            const storageRef = storage.ref();

            const imagesRef = storageRef.child(`${anuncio.id}/`);

            imagesRef.listAll().then(function(resi) {
              resi.items.forEach(function(imaRef) {
                imaRef.getDownloadURL().then((url) => {
                  let enlace = url;
                  enlaces.push(enlace);
                });
              });
              
            });

            anuncio.images = enlaces;

          commit("setAnuncio", anuncio);
        });
    },

    crearAnuncio({ commit }, anuncio) {
      console.log("numero=" + anuncio.num + "    imagen= " + anuncio.fotos);
      db.collection("anuncios")
        .add({
          titulo: anuncio.titulo,
          vendedor: anuncio.vendedor,
          precio: anuncio.precio,
          tel: anuncio.tel,
          marca: anuncio.marca,
          modelo: anuncio.modelo,
          pantalla: anuncio.pantalla,
          sistema: anuncio.sistema,
          rom: anuncio.rom,
          ram: anuncio.ram,
          descripcion: anuncio.descripcion,
          estado: anuncio.estado,
          version: anuncio.version,
        })
        .then((res) => {
          for (let index = 0; index < anuncio.num; index++) {
            console.log(anuncio.fotos[index].name);
            const ref = storage.ref();
            const carpeta = res.id;
            const archivoRef = ref.child(
              `${carpeta}/${anuncio.fotos[index].name}`
            );
            archivoRef.put(anuncio.fotos[index]).then(() => {
              console.log("exito al subir la imagen");
            });
          }
        });
    },
  },
  modules: {},
});
