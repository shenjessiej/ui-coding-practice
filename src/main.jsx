import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './company/Dropdown'
import TransactionList from './company/TransactionList'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TransactionList/>
  </StrictMode>,
)
