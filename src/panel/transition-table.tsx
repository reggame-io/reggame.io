import './transition-table.css';
import { AutomatonState } from '../automaton/state-and-alphabet';
import { DFA } from '../automaton/dfa';
import { Panel } from '../panel';

const translations = {
    "en-US": {
        state: "State",
        alphabet: "Alphabet",
        acceptState: "Accept State",
        "transitionTable": "Transition Table",
    },
    "en-UK": {
        state: "State",
        alphabet: "Alphabet",
        acceptState: "Accept State",
        "transitionTable": "Transition Table",
    },
    "ja": {
        state: "状態",
        alphabet: "文字",
        acceptState: "受理状態",
        "transitionTable": "遷移表",
    }
};

const TransitionTableDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    function renderAutomatonState(state: AutomatonState) {
        return <span className={dfa.accept_states.includes(state) ? 'acceptState' : 'state'}>{state}</span>;
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
                        <td>{renderAutomatonState(state)}</td>
                        {
                            dfa.alphabets.map((alphabet) => (
                                <td key={alphabet}>{
                                    renderAutomatonState(dfa.transition_table.get(state)?.get(alphabet)!)
                                }</td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
}

const TransitionTablePanelDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <Panel title={t.transitionTable}>
        <TransitionTableDfa dfa={dfa} lang={lang} />
    </Panel>
};

export default TransitionTablePanelDfa;
