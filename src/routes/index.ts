import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";

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
];

routerManager.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
