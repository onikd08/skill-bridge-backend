import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const routerManager = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

routerManager.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
