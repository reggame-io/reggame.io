import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard, { isSupportedNaturalLanguage, SupportedNaturalLanguage } from './dashboard.tsx'
import { Alphabet, AutomatonState, getIthAlphabet, getIthAutomatonState } from './automaton/state-and-alphabet.ts';
import { DFA } from './automaton/dfa.ts';

const queryParams = new URLSearchParams(window.location.search);
const table = queryParams.get('table');
const mode = queryParams.get('mode');

const lang: SupportedNaturalLanguage = (() => {
  let lang = queryParams.get('lang');
  if (lang === null)
    return "en-US";
  return isSupportedNaturalLanguage(lang) ? lang : "en-US";
})();

function parseDFA(table_in_string_format: string): DFA | null {
  if (table_in_string_format === "") {
    return null;
  }
  const state_count = table_in_string_format.split('_').length;
  const accept_states: ReadonlyArray<AutomatonState> = [...table_in_string_format].filter((c) => c !== c.toLowerCase()).map((c) => c.toLowerCase()) as unknown as ReadonlyArray<AutomatonState>; // TODO: validation needed
  const alphabets: ReadonlyArray<Alphabet> = table_in_string_format.split('_')[0].split('').map((_, i) => getIthAlphabet( i));
  const transition_table: Map<AutomatonState, Map<Alphabet, AutomatonState>> = new Map();
  for (let i = 0; i < state_count; i++) {
    for (let j = 0; j < alphabets.length; j++) {
      const cell = table_in_string_format.split('_')[i].split('')[j].toLowerCase() as unknown as AutomatonState; // TODO: validation needed
      if (!transition_table.has(getIthAutomatonState(i))) {
        transition_table.set(getIthAutomatonState(i), new Map());
      }
      transition_table.get(getIthAutomatonState(i))?.set(alphabets[j], cell);
    }
  }
  return {
    initial_state: 'a' as ('a' & AutomatonState),
    states: Array.from({ length: state_count }, (_, i) => getIthAutomatonState(i)),
    alphabets,
    transition_table,
    accept_states
  };
}

if (mode !== 'dashboard' || table === null) {
  // redirect to ?mode=dashboard
  window.location.href = `?mode=dashboard&table=${table || "ba_bC_ba"}&lang=${lang}`;
  throw new Error("Redirecting to dashboard");
}

const dfa = parseDFA(table);

if (dfa === null) {
  // redirect to ?mode=dashboard&table=ba_bC_ba
  window.location.href = `?mode=dashboard&table=ba_bC_ba&lang=${lang}`;
  throw new Error("Redirecting to dashboard");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dashboard dfa={dfa} lang={lang} />
  </StrictMode>,
)
