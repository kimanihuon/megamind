import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import VueMeta from 'vue-meta';

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  refreshOnceOnNavigation: true
});
Vue.use(VueRouter);

var dashboard = () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue");

const routes = [

  {
    path: "/",
    name: "root",
    component: dashboard
  },

  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard
  },

  {
    path: "/chat",
    name: "chat",
    component: () => import(/* webpackChunkName: "chat" */ "../views/Chat.vue"),
  },

  {
    path: "/settings",
    name: "settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },

  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),

  },

  {
    path: "/atc",
    name: "atc",
    component: () => import(/* webpackChunkName: "atc" */ "../views/ATC.vue")
  },

  {
    path: "/admin",
    name: "admin",
    component: () => import(/* webpackChunkName: "admin" */ "../views/Admin.vue")
  },

  {
    path: "/tracks",
    name: "tracks",
    component: () => import(/* webpackChunkName: "tracks" */ "../views/Tracks.vue")
  }


  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  saveScrollPosition: true,
  routes,
});


router.beforeEach((to, from, next) => {

  if (store.state.auth && to.path == '/login') {
    next('/dashboard')
  } else if (store.state.auth) {
    next()
  } else if (!store.state.auth && to.path != '/login') {
    next('/login')
  } else if (!store.state.auth && to.path == '/login') {
    next()
  }

})


export default router;
