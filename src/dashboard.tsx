import React from 'react';
import reggameLogo from './assets/reggame-io-logo.png'
import { Graphviz } from 'graphviz-react';
import './dashboard.css';
import { DFA } from './types_automaton';
import TransitionTableDfa from './transition_table';
import AcceptancePercentageTableDfa from './acceptance_percentage_table';
import RegularLanguagePropertiesTableDfa from './regular_language_properties';
import ExportAsCodeDfa from './export-as-code';
import { Panel, UnimplementedPanel } from './panel';

interface DashboardDfaProps {
    dfa: DFA;
    lang: SupportedNaturalLanguage;
}

const translations = {
    "en-US": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
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
        "export": "Export the Automaton as Code",
        "exportVisual": "Export Visual Representation"
    },
    "en-UK": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
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
        "export": "Export the Automaton as Code",
        "exportVisual": "Export Visual Representation"
    },
    "ja": {
        "graphicalRepresentation": "図示",
        "viewSource": "ソースを表示",
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
        "export": "オートマトンをコードとしてエクスポート",
        "exportVisual": "図示をエクスポート"
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

    const graphvizSource = `digraph finite_state_machine {
    node [shape = doublecircle]; ${dfa.accept_states.length ?
            dfa.accept_states.join(", ") + ";" : ""}
    node [shape = circle];
    "" [shape=none];
${[
            ...dfa.transition_table.entries()

        ].map(([state, inner_map]) => {
            return Array.from(inner_map.entries()).map(([c, dest]) => {
                return `    ${state} -> ${dest} [label = "${c}"];`
            }).join("\n")
        }).join("\n")
        }
    "" -> a
}`;

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
                <Panel title={t.graphicalRepresentation}>
                    <Graphviz dot={graphvizSource} options={
                        { height: 300 }
                    } />
                    <details>
                        <summary>{t.viewSource}</summary>
                        <textarea readOnly={true} rows={10} cols={50} defaultValue={graphvizSource} />
                    </details>
                </Panel>

                <Panel title={t.transitionTable}>
                    <TransitionTableDfa dfa={dfa} lang={lang} />
                </Panel>

                <Panel title={t.automatonProperties}>
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

                <UnimplementedPanel title={t.testCases}>
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
                </UnimplementedPanel>

                <Panel title={t.languageProperties}>
                    <RegularLanguagePropertiesTableDfa dfa={dfa} lang={lang} />
                </Panel>

                <Panel title={t.acceptanceRateByStringLength}>
                    <AcceptancePercentageTableDfa dfa={dfa} lang={lang} />
                </Panel>

                <Panel title={t.export}>
                    <ExportAsCodeDfa dfa={dfa} lang={lang} />
                </Panel>

                <Panel title={t.exportVisual}>
                    <div className="export-tabs">
                        <button>Graphviz</button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            TikZ
                        </button>
                    </div>
                    <div className="export-tab-content">
                        <pre>
                            {graphvizSource}
                        </pre>
                    </div>
                </Panel>
            </main>
        </div>
    );
};

export default DashboardDfa;