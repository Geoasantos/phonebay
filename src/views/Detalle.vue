<template>
  <h2>Id: {{anuncio.id}} - {{anuncio.titulo}}</h2>
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
      ...mapActions(['getAnuncio'])
  },
  computed: {
      ...mapState(['anuncio'])
  }
};
</script>
<style scoped>
</style>