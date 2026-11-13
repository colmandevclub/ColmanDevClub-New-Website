import { describe, expect, it } from 'vitest'
import {
  AxiosHeaders,
  type AxiosAdapter,
  type InternalAxiosRequestConfig,
} from 'axios'
import { api } from './api'

describe('API client', () => {
  it.each(['get', 'post', 'put', 'patch', 'delete', 'head', 'options'])(
    'sends the CSRF marker and uses the versioned API base for %s',
    async (method) => {
      let sent: InternalAxiosRequestConfig | undefined
      const adapter: AxiosAdapter = async (config) => {
        sent = config
        return { data: {}, status: 200, statusText: 'OK', headers: {}, config }
      }

      await api.request({ method, url: '/health', adapter })

      expect(sent).toBeDefined()
      expect(api.getUri(sent)).toBe('/api/v1/health')
      expect(sent?.headers.get('X-CDC-Request')).toBe('1')
      expect(sent?.withCredentials).toBe(true)
    },
  )

  it.each(['0', false, null])(
    'restores an overridden CSRF marker (%s)',
    async (value) => {
      const headers = new AxiosHeaders({ 'x-cdc-request': value })
      const adapter: AxiosAdapter = async (config) => {
        expect(config.headers.get('X-CDC-Request')).toBe('1')
        return { data: {}, status: 200, statusText: 'OK', headers: {}, config }
      }

      await api.get('/health', { headers, adapter })
    },
  )
})
