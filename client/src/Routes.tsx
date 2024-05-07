import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/shared/RequireAuth";
import { useAuth } from "./context/AuthContext";
import ImageCredit from "./pages/ImageCredit";
import SiteLayout from "./components/layouts/SiteLayout";
import SiteLayoutJustFooter from "./components/layouts/SiteLayoutJustFooter";
import useAxiosAuthInstance from "./hooks/useAxiosAuthInstance";

const Routes = () => {
  const { user, authenticatedUser } = useAuth();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "/demo",
        element: <SiteLayoutJustFooter />,
        children: [
          {
            path: "/demo",
            element: <Demo />,
          },
        ],
      },
      {
        path: "/credit",
        element: <ImageCredit />,
      },
      {
        path: "/signup",
        element:
          authenticatedUser || user ? <Navigate to="/dashboard" /> : <Signup />,
      },
      {
        path: "/login",
        element:
          authenticatedUser || user ? <Navigate to="/dashboard" /> : <Login />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ]

    // createRoutesFromElements(
    //   <Route path="/">
    //     <Route index element={<Home />} />
    //     <Route path="demo" element={<Demo />} />
    //     <Route path="signup" element={<Signup />} />l
    //     <Route path="login" element={<Login />} />l
    //     <Route path="*" element={<NotFound />} />
    //     <Route element={<RequireAuth />}>
    //       <Route path="dashboard" element={<Dashboard />} />
    //     </Route>
    //   </Route>
    // )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
