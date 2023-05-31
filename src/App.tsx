import { BrowserRouter } from 'react-router-dom'
import { RenderRoutes } from '@/router'

function App() {
  return (
    <BrowserRouter>
      <RenderRoutes />
    </BrowserRouter>
  )
}

export default App
