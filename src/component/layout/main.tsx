import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './transition.css'

const Main = () => {
  const location = useLocation()
  const currentOutlet = useOutlet();
  return <main style={{gridArea: 'main'}} p-3>
    <SwitchTransition mode="out-in">
      <CSSTransition key={location.pathname} timeout={500} classNames="layout-main-page">
        {currentOutlet}
      </CSSTransition>
    </SwitchTransition>
  </main>
}

export default Main