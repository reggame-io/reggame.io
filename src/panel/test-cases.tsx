import './transition-table.css';
import { DFA, runAutomaton } from '../automaton/dfa';
import { Panel } from '../panel';
import React from 'react';

const translations = {
    "en-US": {
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "testCases": "Test Cases",
        "invalidJSON": "⛔Invalid JSON",
        "allPositiveTestCasesPassed": "✅All positive test cases passed",
        "somePositiveTestCasesFailed": "☹️Some positive test cases failed",
        "allNegativeTestCasesPassed": "✅All negative test cases passed",
        "someNegativeTestCasesFailed": "☹️Some negative test cases failed",
        "invalidInput": "⚠️The input contains invalid characters",
    },
    "en-UK": {
        "positiveTestCases": "Positive Test Cases",
        "negativeTestCases": "Negative Test Cases",
        "testCases": "Test Cases",
        "invalidJSON": "⛔Invalid JSON",
        "allPositiveTestCasesPassed": "✅All positive test cases passed",
        "somePositiveTestCasesFailed": "☹️Some positive test cases failed",
        "allNegativeTestCasesPassed": "✅All negative test cases passed",
        "someNegativeTestCasesFailed": "☹️Some negative test cases failed",
        "invalidInput": "⚠️The input contains invalid characters",
    },
    "ja": {
        "positiveTestCases": "受理すべき文字列",
        "negativeTestCases": "拒否すべき文字列",
        "testCases": "テストケース",
        "invalidJSON": "⛔JSONが正しくありません",
        "allPositiveTestCasesPassed": "✅受理すべき文字列がすべて正しく受理されました",
        "somePositiveTestCasesFailed": "☹️受理すべき文字列のうちいくつかが受理されませんでした",
        "allNegativeTestCasesPassed": "✅拒否すべき文字列がすべて正しく拒否されました",
        "someNegativeTestCasesFailed": "☹️拒否すべき文字列のうちいくつかが誤って受理されました",
        "invalidInput": "⚠️入力に無効な文字が含まれています"
    }
};

const runTestCases: (dfa: DFA, testCases: string[], expected: boolean) => boolean | null
    = (dfa: DFA, testCases: string[], expected: boolean) => {
        try {
            return testCases.every(testCase => runAutomaton(dfa, testCase) === expected);
        } catch (e) {
            return null; // the test case contains an invalid character
        };
    };

const TestCasesDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {

    const t = translations[lang];

    const [positiveTestCases, setPositiveTestCases] = React.useState<string[]>(["01", "101", "001", "111101"]);
    const [negativeTestCases, setNegativeTestCases] = React.useState<string[]>(["100", "0010", "1110", "01010111"]);
    const [positiveResult, setPositiveResult] = React.useState<boolean | null>(true);
    const [negativeResult, setNegativeResult] = React.useState<boolean | null>(true);
    const [positiveError, setPositiveError] = React.useState<string | null>(null);
    const [negativeError, setNegativeError] = React.useState<string | null>(null);

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
            setPositiveError(null);
        } catch (e) {
            setPositiveError(t.invalidJSON);
        }
    };

    const handleNegativeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newTestCases = JSON.parse(event.target.value);
            setNegativeTestCases(newTestCases);
            setNegativeError(null);
        } catch (e) {
            setNegativeError(t.invalidJSON);
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
            <textarea
                rows={4}
                cols={30}
                defaultValue={JSON.stringify(positiveTestCases)}
                onChange={handlePositiveChange}
                style={{ backgroundColor: positiveError ? '#ffb4b4' : 'white' }}
            />
            {
                positiveError ?
                    <div style={{ color: 'red' }}>{positiveError}</div>
                    : <div>{
                        positiveResult === true ?
                            t.allPositiveTestCasesPassed :
                            positiveResult === false ?
                                t.somePositiveTestCasesFailed : t.invalidInput
                    }</div>
            }
        </div>
        <div>
            <h3>{t.negativeTestCases}</h3>
            <textarea
                rows={4}
                cols={30}
                defaultValue={JSON.stringify(negativeTestCases)}
                onChange={handleNegativeChange}
                style={{ backgroundColor: negativeError ? '#ffb4b4' : 'white' }}
            />
            {
                negativeError ?
                    <div style={{ color: 'red' }}>{negativeError}</div> :
                    <div>{
                        negativeResult === true ?
                            t.allNegativeTestCasesPassed :
                            negativeResult === false ?
                                t.someNegativeTestCasesFailed :
                                t.invalidInput
                    }</div>
            }
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