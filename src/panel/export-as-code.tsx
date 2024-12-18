import React from "react";
import { SupportedNaturalLanguage } from "../dashboard";
import SyntaxHighlighter from 'react-syntax-highlighter';
import "../panel/export-as-code.css";
import { DFA } from "../automaton/dfa";
import { Panel } from "../panel";

const translations = {
    "en-US": {
        "export": "Export the Automaton as Code",
    },
    "en-UK": {
        "export": "Export the Automaton as Code",
    },
    "ja": {
        "export": "オートマトンをコードとしてエクスポート",
    }
};

const ExportAsCodeDfa: React.FC<{ dfa: DFA, lang: SupportedNaturalLanguage }> = ({ dfa }) => {
    const [programmingLanguage, setProgrammingLanguage] = React.useState('Python');

    const renderCode = () => {
        switch (programmingLanguage) {
            case 'Python':
                return genPython(dfa);
            case 'JavaScript':
                return genJavaScript(dfa);
            case 'TypeScript':
                return genTypeScript(dfa);
            default:
                return '';
        }
    };

    return <>
        <div className="export-tabs">
            {
                ['Python', 'JavaScript', 'TypeScript'].map((prog_lang) => {
                    return <button
                        key={prog_lang}
                        onClick={() => setProgrammingLanguage(prog_lang)}
                        className={programmingLanguage === prog_lang ? 'highlighted' : ''}
                    >
                        {prog_lang}
                    </button>;
                })
            }
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
            <SyntaxHighlighter language={programmingLanguage.toLowerCase()} showLineNumbers={true}>
                {renderCode()}
            </SyntaxHighlighter>
        </div>
    </>;
}

const ExportAsCodePanelDfa: React.FC<{ dfa: DFA, lang: SupportedNaturalLanguage }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <Panel title={t.export}>
        <ExportAsCodeDfa dfa={dfa} lang={lang} />
    </Panel>
}

function genPython(dfa: DFA): string {
    let code = `def run_automaton(input_str):\n`;
    code += `    state = '${dfa.initial_state}' # Initial state\n`;
    code += `    for char in input_str:\n`;
    for (let i = 0; i < dfa.states.length; i++) {
        code += `        if state == '${dfa.states[i]}':\n`;
        for (let j = 0; j < dfa.alphabets.length; j++) {
            code += `            if char == '${dfa.alphabets[j]}':\n`;
            code += `                state = '${dfa.transition_table.get(dfa.states[i])?.get(dfa.alphabets[j])}'\n`;
        }
    }
    code += `    return state in ['${dfa.accept_states.join("', '")}'] # Accept state\n`;
    return code;
}

function genJavaScript(dfa: DFA): string {
    let code = `function runAutomaton(inputStr) {\n`;
    code += `    let state = '${dfa.initial_state}'; // Initial state\n`;
    code += `    for (let char of [...inputStr]) {\n`;
    for (let i = 0; i < dfa.states.length; i++) {
        code += `        if (state === '${dfa.states[i]}') {\n`;
        for (let j = 0; j < dfa.alphabets.length; j++) {
            code += `            if (char === '${dfa.alphabets[j]}') {\n`;
            code += `                state = '${dfa.transition_table.get(dfa.states[i])?.get(dfa.alphabets[j])}';\n`;
            code += `            }\n`;
        }
        code += `        }\n`;
    }
    code += `    }\n`;
    code += `    return ['${dfa.accept_states.join("', '")}'].includes(state); // Accept state\n`;
    code += `}\n`;
    return code;
}

function genTypeScript(dfa: DFA): string {
    let code = `function runAutomaton(inputStr: string): boolean {\n`;
    code += `    type AutomatonState = '${dfa.states.join("' | '")}';\n`;
    code += `    let state: AutomatonState = '${dfa.initial_state}'; // Initial state\n`;
    code += `    for (let char of [...inputStr]) {\n`;
    for (let i = 0; i < dfa.states.length; i++) {
        code += `        if (state === '${dfa.states[i]}') {\n`;
        for (let j = 0; j < dfa.alphabets.length; j++) {
            code += `            if (char === '${dfa.alphabets[j]}') {\n`;
            code += `                state = '${dfa.transition_table.get(dfa.states[i])?.get(dfa.alphabets[j])}';\n`;
            code += `            }\n`;
        }
        code += `        }\n`;
    }
    code += `    }\n`;
    code += `    return ['${dfa.accept_states.join("', '")}'].includes(state); // Accept state\n`;
    code += `}\n`;
    return code;
}

export default ExportAsCodePanelDfa;