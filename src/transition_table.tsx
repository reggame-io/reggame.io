import './transition-table.css';
import { DFA } from './types_automaton';

const TransitionTableDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const translations = {
        "en-US": {
            state: "State",
            alphabet: "Alphabet",
            acceptState: "Accept State"
        },
        "en-UK": {
            state: "State",
            alphabet: "Alphabet",
            acceptState: "Accept State"
        },
        "ja": {
            state: "状態",
            alphabet: "文字",
            acceptState: "受理状態"
        }
    }
    return <table className="transition-table">
        <thead>
            <tr>
                <td>↓ {translations[lang].state} (Q) ＼ {translations[lang].alphabet} (Σ) →</td>
                {
                    dfa.alphabets.map((alphabet) => <td key={alphabet}><code className="alphabet">{alphabet}</code></td>)
                }
            </tr>
        </thead>
        <tbody>
            {
                dfa.states.map((state) => (
                    <tr key={state}>
                        <td><span className={dfa.accept_states.includes(state) ? 'acceptState' : 'state'}>{state}</span></td>
                        {
                            dfa.alphabets.map((alphabet) => (
                                <td key={alphabet}>{dfa.transition_table.get(state)?.get(alphabet)}</td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
}

export default TransitionTableDfa;
