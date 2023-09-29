import Vue from "vue";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import DetailView from "../views/DetailView.vue";
import ProfileView from "../views/ProfileView.vue";
import VueRouter from "vue-router";
import auth from "../middlewares/auth";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/detail/:username",
      name: "detail",
      component: DetailView,
      meta: {
        middleware: [auth],
      },
    },
  ],
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;
  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({
      ...context,
      next: nextMiddleware,
    });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({
      ...context,
      next: nextMiddleware,
    });
  }
  return next();
});

export default router;
