import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();

const routerManager = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/tutors",
    route: TutorRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
];

routerManager.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
