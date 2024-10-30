import React from 'react';
import reggameLogo from './assets/reggame-io-logo.png'
import { Graphviz } from 'graphviz-react';
import './dashboard.css';
import TransitionTablePanelDfa from './panel/transition-table';
import AcceptancePercentagePanelDfa from './panel/acceptance-percentage-table';
import RegularLanguagePropertiesPanelDfa from './panel/regular-language-properties';
import ExportAsCodePanelDfa from './panel/export-as-code';
import { Panel, UnimplementedPanel } from './panel';
import { DFA, getGraphvizSource } from './automaton/dfa';
import TestCasesDfa from './panel/test-cases';
import ExportVisualRepresentationPanelDfa from './panel/export-visual-representation';
import AutomatonPropertiesPanelDfa from './panel/automaton-properties';

interface DashboardDfaProps {
    dfa: DFA;
    lang: SupportedNaturalLanguage;
}

const translations = {
    "en-US": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
        "automatonProperties": "Automaton Properties",
        "type": "Type",
        "numberOfStates": "Number of states",
        "alphabetSet": "Alphabet set",
        "testCases": "Test Cases",
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "property": "Property",
        "value": "Value",
    },
    "en-UK": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
        "automatonProperties": "Automaton Properties",
        "type": "Type",
        "numberOfStates": "Number of states",
        "alphabetSet": "Alphabet set",
        "testCases": "Test Cases",
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "property": "Property",
        "value": "Value",
    },
    "ja": {
        "graphicalRepresentation": "図示",
        "viewSource": "ソースを表示",
        "automatonProperties": "オートマトンの性質",
        "type": "種別",
        "numberOfStates": "状態の数",
        "alphabetSet": "文字集合",
        "testCases": "テストケース",
        "positiveTestCases": "受理すべき文字列",
        "negativeTestCases": "拒否すべき文字列",
        "property": "性質",
        "value": "値",
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

    const graphvizSource = getGraphvizSource(dfa);

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

                <TransitionTablePanelDfa dfa={dfa} lang={lang} />
                <AutomatonPropertiesPanelDfa dfa={dfa} lang={lang} />

                <UnimplementedPanel title={t.testCases}>
                    <TestCasesDfa dfa={dfa} lang={lang} />
                </UnimplementedPanel>

                <RegularLanguagePropertiesPanelDfa dfa={dfa} lang={lang} />
                <AcceptancePercentagePanelDfa dfa={dfa} lang={lang} />
                <ExportAsCodePanelDfa dfa={dfa} lang={lang} />
                <ExportVisualRepresentationPanelDfa dfa={dfa} lang={lang} />
            </main>
        </div>
    );
};

export default DashboardDfa;