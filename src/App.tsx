import { BrowserRouter } from 'react-router-dom'
import { RenderRoutes } from '@/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
