import { DFA } from "./types_automaton";

const translations = {
    "en-US": {
        "property": "Property",
        "value": "Value",
        "minimalAcceptedStringLength": "Minimal Accepted String Length",
        "maximalAcceptedStringLength": "Maximal Accepted String Length",
        "pumpingLength": "Pumping Length",
    },
    "en-UK": {
        "property": "Property",
        "value": "Value",
        "minimalAcceptedStringLength": "Minimal Accepted String Length",
        "maximalAcceptedStringLength": "Maximal Accepted String Length",
        "pumpingLength": "Pumping Length",
    },
    "ja": {
        "property": "性質",
        "value": "値",
        "minimalAcceptedStringLength": "最小受理文字列長",
        "maximalAcceptedStringLength": "最大受理文字列長",
        "pumpingLength": "ポンピング長",
    }
};

const RegularLanguagePropertiesTableDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <table className="properties-table language-properties-table">
        <thead>
            <tr><th>{t.property}</th><th>{t.value}</th></tr>
        </thead>
        <tbody>
            <tr><td>{t.minimalAcceptedStringLength}</td><td>2</td></tr>
            <tr><td>{t.maximalAcceptedStringLength}</td><td>∞</td></tr>
            <tr><td>{t.pumpingLength}</td><td>3</td></tr>
        </tbody>
    </table>
}

export default RegularLanguagePropertiesTableDfa;
