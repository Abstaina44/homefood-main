import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './theme/ThemeProvider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

const loader = document.getElementById('app-boot-loader')
if (loader) {
  loader.classList.add('boot-loader--leaving')
  loader.addEventListener('transitionend', () => loader.remove(), { once: true })
  setTimeout(() => loader.remove(), 800)
}
