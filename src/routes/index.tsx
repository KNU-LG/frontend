import { RouterPath } from "./path"
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom"
import HomePage from "../pages/Home"
import ImageSlides from "../pages/ImageSlides"
import Images from "../pages/Images"
import Login from "../pages/Login"
import Settings from "../pages/Settings"
import Widgets from "../pages/Widgets"
import MyPage from "../pages/MyPage"
import SignUp from "../pages/SignUp"
import { ProtectedRoute } from "./ProtectedRoute"

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
      {
        path: RouterPath.imageSlides,
        element: <ImageSlides />,
      },
      {
        path: RouterPath.images,
        element: <Images />,
      },

      {
        path: RouterPath.settings,
        element: <Settings />,
      },
      {
        path: RouterPath.widgets,
        element: <Widgets />,
      },
      {
        path: RouterPath.signUp,
        element: <SignUp />,
      },
      {
        path: RouterPath.myPage,
        element: <ProtectedRoute />,
        children: [
          {
            path: RouterPath.myPage,
            element: <MyPage />,
          },
        ],
      },
      {
        path: RouterPath.notFound,
        element: <Navigate to={RouterPath.home} />,
      },
    ],
  },
  {
    path: RouterPath.login,
    element: <Login />,
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
