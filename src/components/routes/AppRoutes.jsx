import { lazy } from 'react'
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom'
import ApiService from '../../services/api'

import Error404 from '../../pages/Error404'
import ServerRedirect from './ServerRedirect'
import PrivateRoute from './PrivateRoute'

const Home = lazy(() => import('../../pages/Home'))
const Login = lazy(() => import('../../pages/Login'))
const Register = lazy(() => import('../../pages/Register'))
const Cart = lazy(() => import('../../pages/Cart'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/cart",
    element: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    )
  },
  {
    path: "/404",
    element: <Error404 />
  },
  {
    path: "*",
    element: <ServerRedirect to="/404" />
  }
])

function homeLoader(){
  return defer({products: ApiService.getProducts()})
}

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes