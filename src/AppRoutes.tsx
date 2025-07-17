import { createBrowserRouter } from "react-router";
import { lazy } from "react";
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/reports",
    element: <div>Reports</div>,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;
