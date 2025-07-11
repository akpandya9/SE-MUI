import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";

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
