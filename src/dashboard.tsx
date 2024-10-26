import React from 'react';
import reggameLogo from './assets/reggame-io-logo.png'
import graphviz from './assets/graphviz.svg'
import './dashboard.css';
import { DFA } from './types_automaton';
import TransitionTableDfa from './transition_table';
import AcceptancePercentageTableDfa from './acceptance_percentage_table';
import RegularLanguagePropertiesTableDfa from './regular_language_properties';

interface DashboardDfaProps {
    dfa: DFA;
    lang: SupportedNaturalLanguage;
}

const translations = {
    "en-US": {
        "graphicalRepresentation": "Graphical Representation",
        "transitionTable": "Transition Table",
        "automatonProperties": "Automaton Properties",
        "type": "Type",
        "numberOfStates": "Number of states",
        "alphabetSet": "Alphabet set",
        "testCases": "Test Cases",
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "languageProperties": "Properties of the Formal Language",
        "property": "Property",
        "value": "Value",
        "acceptanceRateByStringLength": "Acceptance Rate by String Length",
        "export": "Export"
    },
    "en-UK": {
        "graphicalRepresentation": "Graphical Representation",
        "transitionTable": "Transition Table",
        "automatonProperties": "Automaton Properties",
        "type": "Type",
        "numberOfStates": "Number of states",
        "alphabetSet": "Alphabet set",
        "testCases": "Test Cases",
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "languageProperties": "Properties of the Formal Language",
        "property": "Property",
        "value": "Value",
        "acceptanceRateByStringLength": "Acceptance Rate by String Length",
        "export": "Export"
    },
    "ja": {
        "graphicalRepresentation": "図示",
        "transitionTable": "遷移表",
        "automatonProperties": "オートマトンの性質",
        "type": "種別",
        "numberOfStates": "状態の数",
        "alphabetSet": "文字集合",
        "testCases": "テストケース",
        "positiveTestCases": "受理すべき文字列",
        "negativeTestCases": "拒否すべき文字列",
        "languageProperties": "形式言語の性質",
        "property": "性質",
        "value": "値",
        "acceptanceRateByStringLength": "文字列長ごとの受理率",
        "export": "エクスポート"
    }
};

export type SupportedNaturalLanguage = keyof typeof translations;

export function isSupportedNaturalLanguage(lang: string): lang is SupportedNaturalLanguage {
    return lang in translations;
}

const DashboardDfa: React.FC<DashboardDfaProps> = ({ dfa, lang }) => {

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const queryParams = new URLSearchParams(window.location.search);
        const lang = isSupportedNaturalLanguage(event.target.value) ? event.target.value : 'en-US';

        window.location.href = `?mode=dashboard&table=${queryParams.get('table') || "ba_bC_ba"
            }&lang=${lang}`;
        throw new Error("Changing the language");
    };

    const t = translations[lang];

    return (
        <div>
            <header>
                <img src={reggameLogo} height="90" alt="Logo" />
                <div className="language-selection">
                    <select value={lang} onChange={handleLanguageChange}>
                        <option value="en-US">English (United States)</option>
                        <option value="en-UK">English (United Kingdom)</option>
                        <option value="ja">日本語</option>
                    </select>
                </div>
            </header>

            <main>
                <div className="panel unimplemented">
                    <h2>{t.graphicalRepresentation}</h2>
                    <img src={graphviz} alt="Automaton Diagram" />
                </div>

                <div className="panel">
                    <h2>{t.transitionTable}</h2>
                    <TransitionTableDfa dfa={dfa} lang={lang} />
                </div>

                <div className="panel">
                    <h2>{t.automatonProperties}</h2>
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
                </div>

                <div className="panel unimplemented">
                    <h2>{t.testCases}</h2>
                    <div className="test-case-tabs">
                        <button>JSON</button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            Plain text
                        </button>
                    </div>
                    <div>
                        <h3>{t.positiveTestCases}</h3>
                        <textarea rows={4} cols={30} defaultValue={`["01", "101", "001", "111101"]`} />
                    </div>
                    <div>
                        <h3>{t.negativeTestCases}</h3>
                        <textarea rows={4} cols={30} defaultValue={`["100", "0010", "1110", "01010111"]`} />
                    </div>
                </div>

                <div className="panel unimplemented">
                    <h2>{t.languageProperties}</h2>
                    <RegularLanguagePropertiesTableDfa dfa={dfa} lang={lang} />
                </div>

                <div className="panel">
                    <h2>{t.acceptanceRateByStringLength}</h2>
                    <AcceptancePercentageTableDfa dfa={dfa} lang={lang} />
                </div>

                <div className="panel export-section">
                    <h2>{t.export}</h2>
                    <div className="export-tabs">
                        <button>Python</button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            JavaScript
                        </button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            TypeScript
                        </button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            Rust
                        </button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            Java
                        </button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            C++
                        </button>
                        <button disabled className="tooltip tooltip-only-ascii">C</button>
                    </div>
                    <div className="export-tab-content">
                        <pre>
                            {genPython_(dfa)}
                        </pre>
                    </div>
                </div>
            </main>
        </div>
    );
};





function genPython_(dfa: DFA): string {
    let code = `def run_automaton(input_str):\n`;
    code += `    state = '${dfa.initial_state}' # Initial state\n`;
    for (let i = 0; i < dfa.states.length; i++) {
        code += `    if state == '${dfa.states[i]}':\n`;
        for (let j = 0; j < dfa.alphabets.length; j++) {
            code += `        if char == '${dfa.alphabets[j]}':\n`;
            code += `            state = '${dfa.transition_table.get(dfa.states[i])?.get(dfa.alphabets[j])}'\n`;
        }
    }
    code += `    return state in ['${dfa.accept_states.join("', '")}'] # Accept state\n`;
    return code;
}

export default DashboardDfa;