import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiJson } from '../lib/api'
import type { AuthUser } from './types'

const STORAGE_KEY = 'homefood_auth_token'

type AuthPayload = {
  token: string
  user: AuthUser
  verificationToken?: string
}

type AuthResponse = {
  success: true
  message?: string
  data: AuthPayload
}

type MeResponse = {
  success: true
  data: { user: AuthUser }
}

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  ready: boolean
  login: (email: string, password: string) => Promise<void>
  register: (payload: { email: string; name: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY))
  const [ready, setReady] = useState(false)

  const refreshUser = useCallback(async () => {
    const t = localStorage.getItem(STORAGE_KEY)
    if (!t) {
      setUser(null)
      return
    }
    const res = await apiJson<MeResponse>('/api/auth/me', {
      headers: { Authorization: `Bearer ${t}` },
    })
    setUser(res.data.user)
  }, [])

  // Runs whenever the in-memory token changes (login / logout / register all update it).
  // Guard on `token` (React state) so we don't hit /api/auth/me unnecessarily when there's
  // nothing to validate. refreshUser() handles the actual localStorage read internally.
  //
  // Tried: reading localStorage here directly to seed on first mount —
  //   const stored = localStorage.getItem(STORAGE_KEY)
  //   if (stored) setToken(stored)
  // …but it triggered a double /api/auth/me call on login (effect fired for both the seeded
  // value and the login-set value). Reverted; relying on token state is cleaner.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!token) {
        // No active session token — clear user and mark context ready so the app can render
        setUser(null)
        setReady(true)
        return
      }
      try {
        await refreshUser()
      } catch {
        localStorage.removeItem(STORAGE_KEY)
        if (!cancelled) {
          setToken(null)
          setUser(null)
        }
      } finally {
        if (!cancelled) setReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token, refreshUser])

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiJson<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    localStorage.setItem(STORAGE_KEY, res.data.token)
    setToken(res.data.token)
    setUser(res.data.user)
  }, [])

  const register = useCallback(async (payload: { email: string; name: string; password: string }) => {
    const res = await apiJson<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    localStorage.setItem(STORAGE_KEY, res.data.token)
    setToken(res.data.token)
    setUser(res.data.user)
  }, [])

  const logout = useCallback(async () => {
    const t = localStorage.getItem(STORAGE_KEY)
    try {
      await apiJson('/api/auth/logout', {
        method: 'POST',
        headers: t ? { Authorization: `Bearer ${t}` } : {},
      })
    } catch {
      /* still clear client */
    }
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      ready,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, ready, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Companion hook to `AuthProvider` (Fast Refresh allows one extra export). */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
