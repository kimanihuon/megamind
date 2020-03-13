import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Login from "../views/Login";

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

  // Verify login status
  Vue.prototype.$http.create({ withCredentials: true })
    .post("http://localhost:5443/api/login/verify")
    .then(response => {
      if (response.data.authorized) {
        store.dispatch("auth");
        if (to.path == '/' || to.path == '/login' ) {
          next('/dashboard')
        } 
        else {
          next()
        }

      } else {
        store.dispatch("deauth");
        next('/login')
      }
    },
      err => {
        err
        store.dispatch("deauth");
        next()
      }
    );

})


export default router;
