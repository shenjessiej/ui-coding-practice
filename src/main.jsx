import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './Dropdown'
import TransactionList from './TransactionList'
import FormApp from './Form'
import App from './Histogram'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
