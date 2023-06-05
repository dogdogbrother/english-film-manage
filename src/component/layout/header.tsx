import { MenuUnfoldOutlined } from '@ant-design/icons'
import { observer } from "mobx-react-lite"
import layoutStore from './layoutStore'
import UserStore from '@/store/user'
import { useEffect } from 'react'
import { getInfo } from '@/api/user'
import { Dropdown, message } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header = observer(() => {
  const { username, setUsername, setId, logout } = UserStore
  const navigate = useNavigate()
  useEffect(() => {
    if (username) return
    getInfo().then(res => {
      setUsername(res.username)
      setId(res.id)
    }).catch(async () => {
      await logout()
      navigate('/login')
    })
  }, [])
  const { setCollapsed, collapsed } = layoutStore
  async function _logout() {
    await logout()
    message.success('已退出登录')
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      label: <span onClick={_logout}>退出登录</span>,
      key: '0',
    }
  ]
  return <header style={{gridArea: 'header'}} flex p-x-3 border="b-solid b-1 gray-3" items-center flex-justify-between>
    <MenuUnfoldOutlined style={{fontSize: '20px'}} cursor-pointer onClick={() => setCollapsed(!collapsed)}/>
    <div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <span text-4 color-truegray-600 cursor-pointer>{ username }</span>
      </Dropdown>
    </div>
  </header>
})

export default Header