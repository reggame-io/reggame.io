import './styles.css';
import { DFA } from './types_automaton';

const TransitionTableDfa: React.FC<{ dfa: DFA }> = ({ dfa }) => {
    return <table className="transition-table">
        <thead>
            <tr>
                <td>↓ State (Q) ＼ Alphabet (Σ) →</td>
                {
                    dfa.alphabets.map((alphabet) => <td key={alphabet}>{alphabet}</td>)
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
