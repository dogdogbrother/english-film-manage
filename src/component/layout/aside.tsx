import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import layoutStore from './layoutStore'
import { observer } from "mobx-react-lite"
import { contentRoutes } from "@/router/contentRoutes";
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const Aside = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedMenu, setSelectedMenu] = useState<string[]>([])
  useEffect(() => {
    setSelectedMenu([location.pathname])
  }, [location])
  const { collapsed } = layoutStore
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  
  const items: MenuItem[] = contentRoutes.filter(route => !route.hidden).map(route => {
    const { path, children, icon, name } = route
    return getItem(
      name, 
      path, 
      icon,
      children?.length ? children.map(route => {
        return getItem(route.name, route.path)
      }) : undefined)
  })
  function onMenu(menu: any) {
    navigate(menu.key)
  }
  return <aside style={{gridArea: 'aside'}} className={!collapsed ? 'w-50' : undefined} relative z-1>
    <Menu 
      h-screen 
      mode="inline" 
      theme="dark" 
      items={items} 
      inlineCollapsed={collapsed} 
      onClick={onMenu}
      selectedKeys={selectedMenu}
    />
  </aside>
})

export default Aside