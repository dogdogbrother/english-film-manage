import { RouteObject, useRoutes } from 'react-router-dom'
import Layout from '@/component/layout'
import Login from '@/pages/login'
import { contentRoutes, type ContentRoutes } from './contentRoutes'

function flattenRoutes(routes: ContentRoutes[]) {
  return routes.reduce((pre, cur) => {
    if (cur.children?.length) {
      cur.children.forEach(route => (pre as RouteObject[]).push(route))
    } else (pre as RouteObject[]).push(cur)
    return pre
  }, [])
}

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: flattenRoutes(contentRoutes)
  },
  {
    path: 'login',
    element: <Login />,
  }
]
export function RenderRoutes() {
  return useRoutes(routes)
}