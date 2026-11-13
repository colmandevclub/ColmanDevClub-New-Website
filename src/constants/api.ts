export const API_CONFIG = {
  BASE_URL: '/api/v1',
  PROXY_PREFIX: '/api',
  WITH_CREDENTIALS: true,
  REQUEST_HEADER: {
    NAME: 'X-CDC-Request',
    VALUE: '1',
  },
} as const
