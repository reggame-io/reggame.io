import { DFA } from "../automaton/dfa";
import { Panel } from "../panel";

const translations = {
    "en-US": {
        "automatonProperties": "Automaton Properties",
        "type": "Type",
        "numberOfStates": "Number of states",
        "alphabetSet": "Alphabet set",
        "testCases": "Test Cases",
        "property": "Property",
        "value": "Value",
    },
    "en-UK": {
        "automatonProperties": "Automaton Properties",
        "type": "Type",
        "numberOfStates": "Number of states",
        "alphabetSet": "Alphabet set",
        "testCases": "Test Cases",
        "property": "Property",
        "value": "Value",
    },
    "ja": {
        "automatonProperties": "オートマトンの性質",
        "type": "種別",
        "numberOfStates": "状態の数",
        "alphabetSet": "文字集合",
        "testCases": "テストケース",
        "property": "性質",
        "value": "値",
    }
};


const AutomatonPropertiesPanelDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <Panel title={t.automatonProperties}>
        <table className="properties-table">
            <thead>
                <tr><th>{t.property}</th><th>{t.value}</th></tr>
            </thead>
            <tbody>
                <tr><td>{t.type}</td><td>
                    DFA (
                    <a href="https://en.wikipedia.org/w/index.php?title=Deterministic_finite_automaton&oldid=1234881968#Complete_and_incomplete">
                        complete
                    </a>
                    )
                </td></tr>
                <tr><td>{t.numberOfStates}</td><td>{dfa.states.length} </td></tr>
                <tr><td>{t.alphabetSet}</td><td>
                    {'{'}
                    {
                        dfa.alphabets
                            .map(alphabet => <code className='alphabet' key={alphabet}>{alphabet}</code>)
                            .reduce((prev, curr) => <>
                                {prev}<span>{', '}</span>{curr}
                            </>)
                    }
                    {'}'}</td></tr>
            </tbody>
        </table>
    </Panel>
};

export default AutomatonPropertiesPanelDfa;