import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'coverage',
          Component: Coverage,
          loader: () => fetch('/servicesCenter.json').then(res => res. json())
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);