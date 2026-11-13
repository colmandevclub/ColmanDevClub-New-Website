import axios from 'axios'
import { API_CONFIG } from '@/constants/api'

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  headers: {
    [API_CONFIG.REQUEST_HEADER.NAME]: API_CONFIG.REQUEST_HEADER.VALUE,
  },
})

// Keep the CSRF marker on every request, even when callers override headers.
api.interceptors.request.use((config) => {
  config.headers.set(
    API_CONFIG.REQUEST_HEADER.NAME,
    API_CONFIG.REQUEST_HEADER.VALUE,
    true,
  )
  return config
})
