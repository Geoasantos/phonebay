import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/estadisticas',
    name: 'Estadisticas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Estadisticas.vue')
  },
  {
    path: '/detalles/:id',
    name: 'Detalles',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detalle.vue')
  },
  {
    path: '/nuevo',
    name: 'NuevoAnuncio',
    component: () => import(/* webpackChunkName: "about" */ '../views/nuevoAnuncio.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
