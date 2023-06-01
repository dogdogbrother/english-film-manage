import { MenuUnfoldOutlined } from '@ant-design/icons'
import { observer } from "mobx-react-lite"
import layoutStore from './layoutStore'

{/* <MenuUnfoldOutlined /> */}
const Header = observer(() => {
  const { setShrink, isShrink } = layoutStore
  return <header style={{gridArea: 'header'}} flex p-x-3 border="b-solid b-1 gray-3" items-center flex-justify-between>
    <MenuUnfoldOutlined style={{fontSize: '20px'}} cursor-pointer onClick={() => setShrink(!isShrink)}/>
    <div>
      {isShrink ? '1' : '2'}
      我是头部
    </div>
  </header>
})

export default Header