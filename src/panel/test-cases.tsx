import './transition-table.css';
import { DFA, runAutomaton } from '../automaton/dfa';
import { Panel } from '../panel';
import React from 'react';

const translations = {
    "en-US": {
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "testCases": "Test Cases",
    },
    "en-UK": {
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "testCases": "Test Cases",
    },
    "ja": {
        "positiveTestCases": "受理すべき文字列",
        "negativeTestCases": "拒否すべき文字列",
        "testCases": "テストケース",
    }
};

const runTestCases = (dfa: DFA, testCases: string[], expected: boolean) => {
    return testCases.every(testCase => runAutomaton(dfa, testCase) === expected);
};

const TestCasesDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {

    const t = translations[lang];

    const [positiveTestCases, setPositiveTestCases] = React.useState<string[]>(["01", "101", "001", "111101"]);
    const [negativeTestCases, setNegativeTestCases] = React.useState<string[]>(["100", "0010", "1110", "01010111"]);
    const [positiveResult, setPositiveResult] = React.useState<boolean>(true);
    const [negativeResult, setNegativeResult] = React.useState<boolean>(true);

    React.useEffect(() => {
        setPositiveResult(runTestCases(dfa, positiveTestCases, true));
    }, [positiveTestCases, dfa]);

    React.useEffect(() => {
        setNegativeResult(runTestCases(dfa, negativeTestCases, false));
    }, [negativeTestCases, dfa]);

    const handlePositiveChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newTestCases = JSON.parse(event.target.value);
            setPositiveTestCases(newTestCases);
        } catch (e) {
            console.error("Invalid JSON");
        }
    };

    const handleNegativeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newTestCases = JSON.parse(event.target.value);
            setNegativeTestCases(newTestCases);
        } catch (e) {
            console.error("Invalid JSON");
        }
    };

    return <>
        <div className="test-case-tabs">
            <button>JSON</button>
            <button disabled className="tooltip tooltip-unimplemented">
                Plain text
            </button>
        </div>
        <div>
            <h3>{t.positiveTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={JSON.stringify(positiveTestCases)} onChange={handlePositiveChange} />
            <div>{positiveResult ? "✅All positive test cases passed" : "☹️Some positive test cases failed"}</div>
        </div>
        <div>
            <h3>{t.negativeTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={JSON.stringify(negativeTestCases)} onChange={handleNegativeChange} />
            <div>{negativeResult ? "✅All negative test cases passed" : "☹️Some negative test cases failed"}</div>
        </div>
    </>;
}

const TestCasesPanelDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <Panel title={t.testCases}>
        <TestCasesDfa dfa={dfa} lang={lang} />
    </Panel>
}
export default TestCasesPanelDfa;