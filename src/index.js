import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from '../src/context/authContext'
import { App } from './components/App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
