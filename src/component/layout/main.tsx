import { useLocation, useOutlet, Outlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './transition.css'

const Main = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  return <main style={{gridArea: 'main', height: 'calc(100vd - 50px)', overflowY: 'auto'}} p-3>
    <SwitchTransition mode="out-in">
      <CSSTransition key={location.pathname} timeout={500} classNames="layout-main-page">
        {currentOutlet || <Outlet />}
      </CSSTransition>
    </SwitchTransition>
  </main>
}

export default Main