import { type FormEvent, useState } from "react"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from "../auth/AuthContext"
import { AuthPageShell } from '../components/auth/AuthPageShell'
import { PASSWORD_HINT, PASSWORD_REGEX } from "../constants/auth"
import { ApiHttpError } from '../lib/api'

export default function RegisterPage() {
  const { user, ready, register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  // count how many times they tried to submit
  const [submitCount, setSubmitCount] = useState(0)

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-cream text-sm text-charcoal/60">
        Loading…
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitCount(submitCount + 1)
    console.log("register submit ->", { name: name, email: email, password: password, confirm: confirm })
    setError(null)

    // validate the form
    var valid = true
    if (name.trim().length < 2) {
      valid = false
      setError("Please enter your name.")
    }
    if (valid == true && password != confirm) {
      valid = false
      setError('Passwords do not match.')
    }
    if (valid == true && PASSWORD_REGEX.test(password) == false) {
      valid = false
      setError(PASSWORD_HINT)
    }
    if (valid == false) {
      return
    }

    setLoading(true)
    try {
      await register({ email: email.trim(), name: name.trim(), password: password })
      navigate('/', { replace: true })
    } catch (err) {
      // TODO: handle the different error codes properly
      if (err instanceof ApiHttpError) {
        setError(err.message)
      } else {
        setError("Registration failed.")
      }
    }
    setLoading(false)
  }

  const fieldClass = 'block text-sm font-semibold text-charcoal'

  return (
    <AuthPageShell
      title="Create account"
      subtitle={`Password rules: ${PASSWORD_HINT}`}
      footer={
        <Link to="/login" className="font-semibold text-tomato hover:underline">
          Already have an account? Sign in
        </Link>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className={fieldClass} htmlFor="reg-name">Name</label>
          <input
            id="reg-name" name="name" type="text" autoComplete="name" required
            className="field-input"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className={fieldClass} htmlFor="reg-email">Email</label>
          <input
            id="reg-email" name="email" type="email" autoComplete="email" required
            className="field-input"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={fieldClass} htmlFor="reg-password">Password</label>
          <input
            id="reg-password" name="password" type="password" autoComplete="new-password" required
            className="field-input"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className={fieldClass} htmlFor="reg-confirm">Confirm password</label>
          <input
            id="reg-confirm" name="confirm" type="password" autoComplete="new-password" required
            className="field-input"
            value={confirm} onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        {error ? (
          <p className="rounded-lg border border-error/30 bg-error-light px-3 py-2 text-sm text-error" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-tomato py-3 font-semibold text-white shadow-md transition hover:bg-tomato-hover disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>
    </AuthPageShell>
  )
}
