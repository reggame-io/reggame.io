import React from 'react';
import reggameLogo from './assets/reggame-io-logo.png'
import graphviz from './assets/graphviz.svg'
import './styles.css';
import { DFA } from './types_automaton';
import TransitionTableDfa from './transition_table';

interface DashboardDfaProps {
    dfa: DFA;
}

const DashboardDfa: React.FC<DashboardDfaProps> = ({ dfa }) => {

    return (
        <div>
            <header>
                <img src={reggameLogo} height="90" alt="Logo" />
                <div className="language-selection">
                    <select>
                        <option value="en-US">English (United States)</option>
                        <option value="en-UK">English (United Kingdom)</option>
                    </select>
                </div>
            </header>

            <main>
                <div className="graphical-representation unimplemented">
                    <h2>Graphical Representation</h2>
                    <img src={graphviz} alt="Automaton Diagram" />
                    {/* 
                    digraph finite_state_machine {
                        node [shape = doublecircle]; c;
                        node [shape = circle];
                        "" [shape=none];
                        a -> b [label = "0"];
                        a -> a [label = "1"];
                        b -> b [label = "0"];
                        b -> c [label = "1"];
                        c -> b [label = "0"];
                        c -> a [label = "1"];
                        "" -> a
                    }
                    */}
                </div>

                <div className="transition-table">
                    <h2>Transition Table</h2>
                    <TransitionTableDfa dfa={dfa} />
                </div>

                <div className="automaton-type">
                    <h2>Automaton Properties:</h2>
                    {<table>
                        <thead>
                            <tr><th>Property</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Type</td><td>
                                DFA (
                                <a href="https://en.wikipedia.org/w/index.php?title=Deterministic_finite_automaton&oldid=1234881968#Complete_and_incomplete">
                                    complete
                                </a>
                                )
                            </td></tr>
                            <tr><td>Number of states</td><td>{dfa.states.length} </td></tr>
                            <tr><td>Alphabet set</td>
                                <td>{
                                    '{' + dfa.alphabets.join(', ') + '}'
                                }</td></tr></tbody>
                    </table>}
                </div>

                <div className="test-cases unimplemented">
                    <h2>Test Cases</h2>
                    <div className="test-case-tabs">
                        <button>JSON</button>
                        <button disabled className="tooltip tooltip-unimplemented">
                            Plain text
                        </button>
                    </div>
                    <div>
                        <h3>Positive Test Cases</h3>
                        <textarea rows={4} cols={30} defaultValue={`["01", "101", "001", "111101"]`} />
                    </div>
                    <div>
                        <h3>Negative Test Cases</h3>
                        <textarea rows={4} cols={30} defaultValue={`["100", "0010", "1110", "01010111"]`} />
                    </div>
                </div>

                <div className="properties-table-container unimplemented">
                    <h2>Language Properties</h2>
                    {<table className="properties-table">
                        <thead>
                            <tr><th>Property</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Minimal Accepted String Length</td><td>2</td></tr>
                            <tr><td>Maximal Accepted String Length</td><td>∞</td></tr>
                            <tr><td>Pumping Length</td><td>3</td></tr>
                        </tbody>
                    </table>}
                </div>

                <div className="bar-graph unimplemented">
                    <h2>Acceptance Rate by String Length</h2>
                    {<table className="acceptance-table">
                        <thead style={{ fontWeight: 'bold' }}>
                            <tr><td>Length</td><td>Accepted</td><td>Rejected</td><td>Acceptance Rate</td></tr>
                        </thead>
                        <tbody>
                            <tr><td>0</td><td>0</td><td>1</td><td>0%</td></tr>
                            <tr><td>1</td><td>0</td><td>2</td><td>0%</td></tr>
                            <tr><td>2</td><td>1</td><td>3</td><td>25%</td></tr>
                            <tr><td>3</td><td>2</td><td>6</td><td>25%</td></tr>
                            <tr><td>4</td><td>4</td><td>12</td><td>25%</td></tr>
                            <tr><td>5</td><td>8</td><td>24</td><td>25%</td></tr>
                        </tbody>
                    </table>}
                </div>

                <div className="export-section">
                    <h2>Export</h2>
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