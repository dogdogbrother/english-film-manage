import {
  ContainerOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import FilmManage from '@/pages/film-manage'
import Home from '@/pages/home'
import FragmentManage from '@/pages/fragment-manage'
import { Navigate } from 'react-router-dom'

export interface ContentRoutes {
  path: string
  icon?: JSX.Element
  element?: JSX.Element
  name: string
  hidden?: boolean
  children?: {
    name: string
    path: string
    element: JSX.Element
    hidden?: boolean
  }[]
}
export const contentRoutes: ContentRoutes[] = [
  { 
    path: '/home', 
    icon: <ContainerOutlined />,
    element: <Home />, 
    name: '首页',
  },
  { 
    path: '/film-manage', 
    icon: <VideoCameraOutlined />,
    element: <FilmManage />, 
    name: '电影管理'
  },
  { 
    path: '/fragment-manage', 
    element: <FragmentManage />, 
    name: '电影片段',
    hidden: true
  },
  {
    path: '',
    element: <Navigate to='/home' />,
    name: '*'
  },
]