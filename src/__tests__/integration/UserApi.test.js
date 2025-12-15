/* @vitest-environment node */
import axios from 'axios'
import { describe, it, expect } from 'vitest'

// Allow tests to target a custom API URL. Defaults to localhost used by the app.
const baseURL = process.env.TEST_API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://localhost:7104/api'

// Accept self-signed certificates for local dev servers (use cautiously).
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

describe('User API integration', () => {
  it('returns a user list containing admin@nwapp.com', async () => {
    const url = baseURL.replace(/\/$/, '') + '/Users'
    const res = await axios.get(url, { timeout: 15000 })
    expect(Array.isArray(res.data)).toBe(true)
    const hasAdmin = res.data.some(u => u && u.email === 'admin@nwapp.com')
    expect(hasAdmin).toBe(true)
  }, 20000)
})
