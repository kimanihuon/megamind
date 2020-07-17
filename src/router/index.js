import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import VueMeta from 'vue-meta';
import Error404 from "../views/Error404.vue";
import { verify } from "../controllers/api";

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  refreshOnceOnNavigation: true
});
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },

  {
    path: "/login",
    name: "login",
    component: function () {
      return import(/* webpackChunkName: "login" */ "../views/Login.vue");
    },
    meta: {
      requiresGuest: true,
    }
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: function () {
      return import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue");
    },
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/chat",
    name: "chat",
    component: function () {
      return import(/* webpackChunkName: "chat" */ "../views/Chat.vue");
    },
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/settings",
    name: "settings",
    component: function () {
      return import(/* webpackChunkName: "settings" */ "../views/Settings.vue");
    },
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/profile",
    name: "profile",
    component: function () {
      return import(/* webpackChunkName: "profile" */ "../views/Profile.vue");
    },
    meta: {
      requiresAuth: true
    }

  },

  {
    path: "/admin",
    name: "admin",
    component: function () {
      return import(/* webpackChunkName: "admin" */ "../views/Admin.vue");
    },
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/tracks",
    name: "tracks",
    component: function () {
      return import(/* webpackChunkName: "tracks" */ "../views/Tracks.vue")
    },
    meta: {
      requiresAuth: false
    }
  },

  {
    path: '*',
    name: '404',
    component: Error404
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  saveScrollPosition: true,
  routes,
});

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    verify(Vue.prototype.$api, store).then((res) => {
      // Check if NOT logged in
      if (!res === true) {
        // Go to login page
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        // Proceed to route
        Vue.prototype.$openSocket()
        next()
      }
    })
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    verify(Vue.prototype.$api, store, Vue).then((res) => {
      // If logged in
      if (res === true) {
        // Go to dashboard
        Vue.prototype.$openSocket()
        next({
          path: '/dashboard',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        // Proceed to route
        next()
      }
    })
  } else {
    verify(Vue.prototype.$api, store).then((res) => {
      // Check if NOT logged in
      if (!res === true) {
        next()
      } else {
        Vue.prototype.$openSocket()
        next()
      }
    })
  }
})

export default router;
