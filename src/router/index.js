import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  },

  {
    path: "/chat",
    name: "chat",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Chat.vue")
  },

  {
    path: "/settings",
    name: "settings",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Settings.vue")
  },

  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Profile.vue")
  },

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

  if (store.state.auth && to.path == '/') {
    next('/dashboard')
  } else if (store.state.auth && to.path == '/login') {
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
