import {
  ContainerOutlined,
  DesktopOutlined,
} from '@ant-design/icons'
// import Home from '@/pages/home'
import HomeTow from '@/pages/home2'
import HomeSub from '@/pages/home-sub'

export interface ContentRoutes {
  path: string
  icon: JSX.Element
  element?: JSX.Element
  name: string
  children?: {
    name: string
    path: string
    element: JSX.Element
  }[]
}
export const contentRoutes: ContentRoutes[] = [
  { 
    path: '/home', 
    icon: <ContainerOutlined />,
    name: '一级菜单',
    children: [
      {
        path: '/home-ube', 
        element: <HomeSub />, 
        name: '一级子菜单'
      }
    ]
  },
  { path: '/home2', name: '第二个菜单', element: <HomeTow />, icon: <DesktopOutlined /> }
]