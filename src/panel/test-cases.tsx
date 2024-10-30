import './transition-table.css';
import { DFA, runAutomaton } from '../automaton/dfa';
import { Panel } from '../panel';
import React from 'react';

const translations = {
    "en-US": {
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "testCases": "Test Cases",
        "invalidJSON": "Invalid JSON",
        "allPositiveTestCasesPassed": "✅All positive test cases passed",
        "somePositiveTestCasesFailed": "☹️Some positive test cases failed",
        "allNegativeTestCasesPassed": "✅All negative test cases passed",
        "someNegativeTestCasesFailed": "☹️Some negative test cases failed",
    },
    "en-UK": {
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "testCases": "Test Cases",
        "invalidJSON": "Invalid JSON",
        "allPositiveTestCasesPassed": "✅All positive test cases passed",
        "somePositiveTestCasesFailed": "☹️Some positive test cases failed",
        "allNegativeTestCasesPassed": "✅All negative test cases passed",
        "someNegativeTestCasesFailed": "☹️Some negative test cases failed",
    },
    "ja": {
        "positiveTestCases": "受理すべき文字列",
        "negativeTestCases": "拒否すべき文字列",
        "testCases": "テストケース",
        "invalidJSON": "JSONが正しくありません",
        "allPositiveTestCasesPassed": "✅受理すべき文字列がすべて正しく受理されました",
        "somePositiveTestCasesFailed": "☹️受理すべき文字列のうちいくつかが受理されませんでした",
        "allNegativeTestCasesPassed": "✅拒否すべき文字列がすべて正しく拒否されました",
        "someNegativeTestCasesFailed": "☹️拒否すべき文字列のうちいくつかが誤って受理されました",
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
            console.error(t.invalidJSON);
        }
    };

    const handleNegativeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newTestCases = JSON.parse(event.target.value);
            setNegativeTestCases(newTestCases);
        } catch (e) {
            console.error(t.invalidJSON);
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
            <div>{positiveResult ? t.allPositiveTestCasesPassed : t.somePositiveTestCasesFailed}</div>
        </div>
        <div>
            <h3>{t.negativeTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={JSON.stringify(negativeTestCases)} onChange={handleNegativeChange} />
            <div>{negativeResult ? t.allNegativeTestCasesPassed : t.someNegativeTestCasesFailed}</div>
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