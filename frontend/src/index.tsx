import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './main.scss'

import { StrictMode } from 'react'

const rootElement : any = document.getElementById('root')
const root = createRoot(rootElement)

console.log('root')
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)