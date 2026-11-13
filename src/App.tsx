import { BrowserRouter } from 'react-router'
import { AppProviders } from '@/app/providers'
import { AppRoutes } from '@/app/router'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
