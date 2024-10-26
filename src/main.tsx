import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './dashboard.tsx'
import { DFA, State, Alphabet } from './types_automaton.ts';

const queryParams = new URLSearchParams(window.location.search);
const table = queryParams.get('table');
const mode = queryParams.get('mode');

function parseDFA(table_in_string_format: string): DFA | null {
  if (table_in_string_format === "") {
    return null;
  }
  const state_count = table_in_string_format.split('_').length;
  const accept_states = [...table_in_string_format].filter((c) => c !== c.toLowerCase()).map((c) => c.toLowerCase());
  const alphabets = table_in_string_format.split('_')[0].split('').map((_, i) => String.fromCharCode(48 + i));
  const transition_table: Map<State, Map<Alphabet, State>> = new Map();
  for (let i = 0; i < state_count; i++) {
    for (let j = 0; j < alphabets.length; j++) {
      const cell = table_in_string_format.split('_')[i].split('')[j].toLowerCase();
      if (!transition_table.has(String.fromCharCode(97 + i))) {
        transition_table.set(String.fromCharCode(97 + i), new Map());
      }
      transition_table.get(String.fromCharCode(97 + i))?.set(alphabets[j], cell);
    }
  }
  return {
    initial_state: 'a',
    states: Array.from({ length: state_count }, (_, i) => String.fromCharCode(97 + i)),
    alphabets,
    transition_table,
    accept_states
  };
}

if (mode !== 'dashboard' || table === null) {
  // redirect to ?mode=dashboard
  window.location.href = `?mode=dashboard&table=${table || "ba_bC_ba"}`;
  throw new Error("Redirecting to dashboard");
}

const dfa = parseDFA(table);

if (dfa === null) {
  // redirect to ?mode=dashboard&table=ba_bC_ba
  window.location.href = `?mode=dashboard&table=ba_bC_ba`;
  throw new Error("Redirecting to dashboard");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dashboard dfa={dfa} />
  </StrictMode>,
)
