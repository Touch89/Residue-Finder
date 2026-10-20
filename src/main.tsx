import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminApp from './admin/AdminApp'
import './index.css'

// Enrutado mínimo: /admin muestra el panel de administración (sin autenticación por ahora).
const isAdmin = /^\/admin(\/|$)/.test(window.location.pathname)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </React.StrictMode>,
)
