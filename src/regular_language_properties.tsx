import { DFA, AutomatonState } from "./types_automaton";

const translations = {
    "en-US": {
        "property": "Property",
        "value": "Value",
        "minimalAcceptedStringLength": "Minimal Accepted String Length",
        "maximalAcceptedStringLength": "Maximal Accepted String Length",
        "pumpingLength": "Pumping Length",
        "warnEmptyLanguage": "The language is empty; it does not accept any string.",
    },
    "en-UK": {
        "property": "Property",
        "value": "Value",
        "minimalAcceptedStringLength": "Minimal Accepted String Length",
        "maximalAcceptedStringLength": "Maximal Accepted String Length",
        "pumpingLength": "Pumping Length",
        "warnEmptyLanguage": "The language is empty; it does not accept any string.",
    },
    "ja": {
        "property": "性質",
        "value": "値",
        "minimalAcceptedStringLength": "最小受理文字列長",
        "maximalAcceptedStringLength": "最大受理文字列長",
        "pumpingLength": "ポンピング長",
        "warnEmptyLanguage": "言語が空です。いかなる文字列も受理されません。",
    }
};

function minimalAcceptedStringLength(dfa: DFA): number | null {
    const populated: Map<AutomatonState, boolean> = new Map();
    if (dfa.accept_states.includes(dfa.initial_state)) {
        return 0;
    }

    populated.set(dfa.initial_state, true);
    for (let i = 0; i < dfa.states.length; i++) {
        const new_populated: Map<AutomatonState, boolean> = new Map();
        for (const [state, count] of populated) {
            for (const alphabet of dfa.alphabets) {
                const next_state = dfa.transition_table.get(state)?.get(alphabet);
                if (next_state !== undefined) {
                    const flag = new_populated.get(next_state) || count;
                    if (dfa.accept_states.includes(next_state) && flag) { return i + 1; }
                    new_populated.set(next_state, flag);
                }
            }
        }
        populated.clear();
        for (const [state, count] of new_populated) {
            populated.set(state, count);
        }
    }
    return null;
}

const RegularLanguagePropertiesTableDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <>
        {minimalAcceptedStringLength(dfa) === null ? <p>⚠️{t.warnEmptyLanguage}⚠️</p> : false}
        <table className="properties-table language-properties-table">
            <thead>
                <tr><th>{t.property}</th><th>{t.value}</th></tr>
            </thead>
            <tbody>
                <tr><td>{t.minimalAcceptedStringLength}</td><td>{
                    minimalAcceptedStringLength(dfa) === null ? "N/A" : minimalAcceptedStringLength(dfa)
                }</td></tr>
                <tr><td>{t.maximalAcceptedStringLength}</td><td className="unimplemented">∞</td></tr>
                <tr><td>{t.pumpingLength}</td><td className="unimplemented">3</td></tr>
            </tbody>
        </table>
    </>
}

export default RegularLanguagePropertiesTableDfa;
