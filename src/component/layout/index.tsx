import classes from './layout.module.less'
import Aside from './aside'
import Header from './header'
import Main from './main'

const Layout = () => {
  return <div className={classes.homeWrap}>
    <Aside></Aside>
    <Header></Header>
    <Main></Main>
  </div>
}

export default Layout