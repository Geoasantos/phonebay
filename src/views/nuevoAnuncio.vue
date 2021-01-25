<template>
  <div>
    <h1>Crea un Anuncio</h1>
    <v-row style="margin-top: 1em; margin-left: 1em">
      <v-col class="col-11 col-md-5 border mb-2">
        <v-form ref="form1" v-model="valid" lazy-validation>
          <v-text-field
            v-model="anuncioLocal.titulo"
            :counter="50"
            label="Titulo del anuncio"
            :rules="txtRules"
            append-icon="mdi-text-box-multiple"
            required
          ></v-text-field>

          <v-text-field
            v-model="anuncioLocal.vendedor"
            :counter="50"
            :rules="txtRules"
            label="Vendedor"
            append-icon="mdi-account-cash"
            required
          ></v-text-field>

          <v-text-field
            v-model="anuncioLocal.tel"
            :counter="8"
            label="Numero de telefono"
            :rules="telRules"
            append-icon="mdi-cellphone"
            required
          ></v-text-field>

          <v-text-field
            v-model="anuncioLocal.precio"
            label="Precio $"
            :rules="numRules"
            append-icon="mdi-cash-usd"
            required
          ></v-text-field>
        </v-form>
        <div>
          <v-file-input
            label="Agregar Fotos"
            multiple
            v-model="archivo"
            append-icon="mdi-camera-plus"
          ></v-file-input>
        </div>
      </v-col>
      <v-col class="col-11 col-md-5 offset-md-1 border">
        <v-form ref="form2" v-model="valid" lazy-validation>
          <v-row>
            <v-col>
              <v-text-field
                v-model="anuncioLocal.marca"
                :counter="50"
                :rules="txtRules"
                append-icon="mdi-layers-triple"
                label="Marca"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="anuncioLocal.modelo"
                label="Modelo"
                :rules="txtRules"
                append-icon="mdi-cellphone"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="anuncioLocal.pantalla"
                label="Pantalla (Pulgadas)"
                :rules="numRules"
                append-icon="mdi-cellphone-screenshot"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="anuncioLocal.estado"
                :items="estado"
                label="Estado"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="anuncioLocal.sistema"
                :items="sistema"
                label="Sistema Operativo"
                required
                
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="anuncioLocal.version"
                label="Version del Sistema"
                :rules="numRules"
                append-icon="mdi-cellphone-cog"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="anuncioLocal.ram"
                :rules="numRules"
                append-icon="mdi-chip"
                label="RAM (en GB)"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="anuncioLocal.rom"
                :rules="numRules"
                label="ROM (en GB)"
                append-icon="mdi-memory"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              v-model="anuncioLocal.descripcion"
              label="Descripcion"
              append-icon="mdi-text-box"
              :rules="desRules"
            ></v-textarea>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-btn
        color="primary"
        @click="crear"
        :loading="loading"
        :disabled="archivo == null"
        class="mr-3"
      >
        <v-icon>mdi-book-plus</v-icon>Crear
      </v-btn>

      <v-btn color="error" @click="cancel" :disabled="archivo != null">
        <v-icon>mdi-book-cancel</v-icon>Cancelar
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {},

  data() {
    return {
      anuncioLocal: {},
      estado: ["Nuevo", "Usado"],
      sistema: ["Android", "Ios", "Windows"],
      valid: true,
      loading: false,
      archivo: null,
      txtRules: [
        (v) => !!v || "Este campo es requerido",
        (v) => (v && v.length <= 50) || "Debe tener menos de 50 caracteres",
      ],
      desRules: [
        (v) => !!v || "Este campo es requerido",
        (v) =>
          (v && v.length >= 20 && v.length <= 250) ||
          "Debe tener al menos de 20 caracteres y 250 como maximo",
      ],
      telRules: [
        (v) => !!v || "El numero de telefono es requerido",
        (v) =>
          /^[6-7]{1}[0-9]{7}/.test(v) ||
          "El numero de telefono debe ser valido",
        (v) => (v && v.length <= 8) || "Debe tener 8 numeros",
      ],
      numRules: [
        (v) => !!v || "Este campo es requerido",
        (v) =>
          /^\d{1,9}(\.\d{1,2})?$/.test(v) ||
          "El campo debe ser un numero positivo",
      ],
    };
  },
  methods: {
    cancel() {
      this.archivo = null;
      this.anuncioLocal = {};
      this.$router.push("/");
    },

    crear() {
      if (this.$refs.form1.validate() && this.$refs.form2.validate() && this.archivo.length>0){
         this.anuncioLocal.num=(this.archivo.length);
         this.anuncioLocal.fotos=(this.archivo);
         
       
       this.crearAnuncio(this.anuncioLocal);
       Swal.fire({
             
              icon: "success",
              title: "El Anuncio fue creado con exito!",
              timer: 2000,
              showConfirmButton: false,
             
            })
       


       this.limpiar()
       this.$router.push("/");

       
      }else{
         this.$refs.form1.validate();
        this.$refs.form2.validate();
        this.loading=false;
         
         }
    },
    limpiar() {
      this.archivo = null;
      this.anuncioLocal = {};
      
      
    },
   

    ...mapActions(["crearAnuncio","upload"]),
  },
};
</script>


<style scoped>
</style>