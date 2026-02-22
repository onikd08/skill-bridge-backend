import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { AvailabilityRoutes } from "../modules/availability/availability.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";

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
  {
    path: "/availability",
    route: AvailabilityRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

routerManager.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
