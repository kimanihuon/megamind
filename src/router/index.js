import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
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
  if (!store.state.auth && to.path !== '/login') {
    next('/login')
  }
  else {
    if (to.path == '/') {
      next('/dashboard')
    } else if (to.path == '/login' && store.state.auth == true) {
      next('/dashboard')
    } else {
      next()
    }
  }
})


export default router;
