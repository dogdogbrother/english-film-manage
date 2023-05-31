import { Outlet } from 'react-router-dom'

const Main = () => {
  return <main style={{gridArea: 'main'}} p-3>
    123
    <Outlet />
  </main>
}

export default Main