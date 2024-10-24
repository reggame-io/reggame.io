import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dfa from './dfa.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dfa />
  </StrictMode>,
)
