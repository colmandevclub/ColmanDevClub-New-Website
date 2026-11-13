import { Route, Routes } from 'react-router'
import { HomePage } from '@/pages/public/home'
import { NotFoundPage } from '@/pages/errors/not-found'
import { ROUTES } from '@/constants/routes'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  )
}
