import { Navigate, Outlet, RouterProvider, createHashRouter } from "react-router-dom"
import HomePage from "../pages/Home"
import ImageSlides from "../pages/ImageSlides"
import Images from "../pages/Images"
import Login from "../pages/Login"
import MyPage from "../pages/MyPage"
import Settings from "../pages/Settings"
import SignUp from "../pages/SignUp"
import Widgets from "../pages/Widgets"
import WidgetsSetting from "../pages/WidgetsSetting"
import { ProtectedRoute } from "./ProtectedRoute"
import { RouterPath } from "./path"

const router = createHashRouter([
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
        path: RouterPath.signUp,
        element: <SignUp />,
      },
      {
        path: RouterPath.root,
        element: <ProtectedRoute />,
        children: [
          {
            path: RouterPath.myPage,
            element: <MyPage />,
          },
          {
            path: RouterPath.widgetsSetting,
            element: <WidgetsSetting />,
          },
          {
            path: RouterPath.widgets,
            element: <Widgets />,
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
