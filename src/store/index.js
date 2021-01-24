import Vue from "vue";
import Vuex from "vuex";
import { db, storage } from "../firebase.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    anuncios: [],
    anuncio:{},
    images:[],
  },
  mutations: {
    setAnuncios(state, payload) {
      state.anuncios = payload;
    },
    setAnuncio(state,payload){
      state.anuncio=payload;
    },
    setImages(state, payload){
      state.images = payload;
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
          commit('setAnuncio',anuncio);
        });
    },

    async getImages({commit},id){
      const images = [];
      const ref = storage.ref();
      const carpeta = id;
      await ref
        .child(`${carpeta}/`)
        .list({ maxResults: 1 })
        .then((res) => {
          res.items.forEach((imgRef) => {
            imgRef.getDownloadURL().then((url) => {
             
              images.push({ id, url });

            });
          });
          commit('setImages',images)
        });
    },

    crearAnuncio({commit},anuncio){

      console.log("numero="+anuncio.num+"    imagen= " + anuncio.fotos);
     db.collection('anuncios').add({
        
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
        version: anuncio.version
      })
      .then(res => {
        
        
          for (let index = 0; index < anuncio.num; index++) {
            
            console.log(anuncio.fotos[index].name);
            const ref = storage.ref();
            const carpeta = res.id;
            const archivoRef = ref.child(
              `${carpeta}/${anuncio.fotos[index].name}`
            );
            archivoRef.put(anuncio.fotos[index]).then(() => {
             console.log("exito al subir la imagen")
            });
          }
        
        

        


      })


    },

    upload(id,archivo) {
      if (archivo) {
        for (let index = 0; index < archivo.length; index++) {
          console.log(archivo[index].name);
          const ref = storage.ref();
          const carpeta = id;
          const archivoRef = ref.child(
            `${carpeta}/${archivo[index].name}`
          );
          archivoRef.put(archivo[index]).then(() => {
           console.log("exito al subir la imagen")
          });
        }
      }
    },


      
   

    

  


  },
  modules: {},
});
