import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { AppProviders } from './providers'
import { AppRoutes } from './router'

function QueryConsumer() {
  const queryClient = useQueryClient()
  return <span>{queryClient ? 'Query provider ready' : ''}</span>
}

describe('app scaffold', () => {
  it('renders the Hebrew home route with a QueryClient available', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
          <QueryConsumer />
        </MemoryRouter>
      </AppProviders>,
    )

    expect(
      screen.getByRole('heading', { name: 'מועדון הפיתוח' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Query provider ready')).toBeInTheDocument()
  })

  it('provides a working home link for unknown routes', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/missing']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>,
    )

    expect(
      screen.getByRole('heading', { name: 'העמוד לא נמצא' }),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'לעמוד הבית' }))
    expect(
      screen.getByRole('heading', { name: 'מועדון הפיתוח' }),
    ).toBeInTheDocument()
  })
})
