import React from 'react';
import reggameLogo from './assets/reggame-io-logo.png'
import './dashboard.css';
import TransitionTablePanelDfa from './panel/transition-table';
import AcceptancePercentagePanelDfa from './panel/acceptance-percentage-table';
import RegularLanguagePropertiesPanelDfa from './panel/regular-language-properties';
import ExportAsCodePanelDfa from './panel/export-as-code';
import { DFA } from './automaton/dfa';
import TestCasesPanelDfa from './panel/test-cases';
import ExportVisualRepresentationPanelDfa from './panel/export-visual-representation';
import AutomatonPropertiesPanelDfa from './panel/automaton-properties';
import GraphicalRepresentationPanelDfa from './panel/graphical-representation';

interface DashboardDfaProps {
    dfa: DFA;
    lang: SupportedNaturalLanguage;
}

const translations = {
    "en-US": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
        "testCases": "Test Cases",
    },
    "en-UK": {
        "graphicalRepresentation": "Graphical Representation",
        "viewSource": "View Source",
        "testCases": "Test Cases",
    },
    "ja": {
        "graphicalRepresentation": "図示",
        "viewSource": "ソースを表示",
        "testCases": "テストケース",
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
                <GraphicalRepresentationPanelDfa dfa={dfa} lang={lang} />
                <TransitionTablePanelDfa dfa={dfa} lang={lang} />
                <AutomatonPropertiesPanelDfa dfa={dfa} lang={lang} />
                <TestCasesPanelDfa dfa={dfa} lang={lang} />
                <RegularLanguagePropertiesPanelDfa dfa={dfa} lang={lang} />
                <AcceptancePercentagePanelDfa dfa={dfa} lang={lang} />
                <ExportAsCodePanelDfa dfa={dfa} lang={lang} />
                <ExportVisualRepresentationPanelDfa dfa={dfa} lang={lang} />
            </main>
        </div>
    );
};

export default DashboardDfa;