import { useRoutes } from 'react-router-dom'
import Layout from '@/component/layout'
import Login from '@/pages/login'
import Home from '@/pages/home'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home', element: <Home /> }
    ]
  },
  {
    path: 'login',
    element: <Login />,
  }
]
export function RenderRoutes() {
  return useRoutes(routes)
}