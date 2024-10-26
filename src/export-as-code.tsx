import React from "react";
import { DFA } from "./types_automaton";
import { SupportedNaturalLanguage } from "./dashboard";
import "./export-as-code.css";

const ExportAsCodeDfa: React.FC<{ dfa: DFA, lang: SupportedNaturalLanguage }> = ({ dfa }) => {
    const [programmingLanguage, setProgrammingLanguage] = React.useState('Python');

    const renderCode = () => {
        switch (programmingLanguage) {
            case 'Python':
                return genPython_(dfa);
            case 'JavaScript':
                return genJavaScript_(dfa);
            default:
                return '';
        }
    };

    return <>
        <div className="export-tabs">
            <button 
                onClick={() => setProgrammingLanguage('Python')} 
                className={programmingLanguage === 'Python' ? 'highlighted' : ''}
            >
                Python
            </button>
            <button 
                onClick={() => setProgrammingLanguage('JavaScript')} 
                className={programmingLanguage === 'JavaScript' ? 'highlighted' : ''}
            >
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
                {renderCode()}
            </pre>
        </div>
    </>;
}

function genPython_(dfa: DFA): string {
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

function genJavaScript_(dfa: DFA): string {
    let code = `function runAutomaton(inputStr) {\n`;
    code += `    let state = '${dfa.initial_state}'; // Initial state\n`;
    code += `    for (let char of [...inputStr]) {\n`;
    for (let i = 0; i < dfa.states.length; i++) {
        code += `        if (state === '${dfa.states[i]}') {\n`;
        for (let j = 0; j < dfa.alphabets.length; j++) {
            code += `            if (char === '${dfa.alphabets[j]}') {\n`;
            code += `                state = '${dfa.transition_table.get(dfa.states[i])?.get(dfa.alphabets[j])}'\n`;
            code += `            }\n`;
        }
        code += `        }\n`;
    }
    code += `    }\n`;
    code += `    return ['${dfa.accept_states.join("', '")}'].includes(state); // Accept state\n`;
    return code;
}

export default ExportAsCodeDfa;