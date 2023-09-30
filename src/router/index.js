import Vue from "vue";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import DetailView from "../views/DetailView.vue";
import DetailInvestorView from "../views/DetailInvestorView.vue";
import DetailInovatorView from "../views/DetailInovatorView.vue";
import DetailFirmView from "../views/DetailFirmView.vue";
import ProfileView from "../views/ProfileView.vue";
import ChatView from "../views/ChatView.vue";
import NotificationView from "../views/NotificationView.vue";
import InovatorProfileView from "../views/InovatorProfileView.vue";
import InvestorProfileView from "../views/InvestorProfileView.vue";
import FirmProfileView from "../views/FirmProfileView.vue";
import InovatorsView from "../views/InovatorsView.vue";
import InvestorsView from "../views/InvestorsView.vue";
import LawFirmsView from "../views/LawFirmsView.vue";
import CollaboratorsView from "../views/CollaboratorsView.vue";
import VueRouter from "vue-router";
import auth from "../middlewares/auth";
import notInovator from "../middlewares/not-inovator";

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
      path: "/innovators",
      name: "innovators",
      component: InovatorsView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/investors",
      name: "investors",
      component: InvestorsView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/law-firms",
      name: "lawFirms",
      component: LawFirmsView,
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
      path: "/chat",
      name: "chat",
      component: ChatView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/notification",
      name: "notification",
      component: NotificationView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/inovator-profile",
      name: "inovatorProfile",
      component: InovatorProfileView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/investor-profile",
      name: "investorProfile",
      component: InvestorProfileView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/firm-profile",
      name: "firmProfile",
      component: FirmProfileView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/collaborators",
      name: "collaborators",
      component: CollaboratorsView,
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
    {
      path: "/investor/:username",
      name: "detailInvestor",
      component: DetailInvestorView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: "/inovator/:username",
      name: "detailInovator",
      component: DetailInovatorView,
      meta: {
        middleware: [auth, notInovator],
      },
    },
    {
      path: "/firma/:username",
      name: "detailLawFirm",
      component: DetailFirmView,
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
