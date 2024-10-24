import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dfa from './dfa.tsx'

const queryParams = new URLSearchParams(window.location.search);
const table = queryParams.get('table');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dfa table_in_string_format={table || "ba_bC_ba"} />
  </StrictMode>,
)
