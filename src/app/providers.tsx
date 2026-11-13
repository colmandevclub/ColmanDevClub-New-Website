import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Direction } from 'radix-ui'
import { LOCALE } from '@/constants/locale'

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Direction.Provider dir={LOCALE.DIRECTION}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Direction.Provider>
  )
}
