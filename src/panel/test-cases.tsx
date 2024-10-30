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
        "invalidInput": "⚠️An input string contains invalid characters",
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
        "invalidInput": "⚠️An input string contains invalid characters",
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
        "invalidInput": "⚠️入力文字列に無効な文字が含まれています"
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

const Validator: React.FC<
    {
        dfa: DFA,
        texts: {
            title: string,
            allPassed: string,
            someFailed: string,
            invalidInputString: string,
            invalidJSON: string,
        },
        initialTestCases: string[], isPositive: boolean
    }
> = ({ dfa, texts, initialTestCases, isPositive }) => {
    const [testCases, setTestCases] = React.useState<string[]>(initialTestCases);
    const [allPassed, setAllPassed] = React.useState<boolean | null>(true);
    const [jsonError, setJsonError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setAllPassed(runTestCases(dfa, testCases, isPositive));
    }, [testCases, dfa]);

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newTestCases = JSON.parse(event.target.value);
            setTestCases(newTestCases);
            setJsonError(null);
        } catch (e) {
            setJsonError(texts.invalidJSON);
        }
    };

    return <div>
        <h3>{texts.title}</h3>
        <textarea
            rows={4}
            cols={30}
            defaultValue={JSON.stringify(testCases)}
            onChange={handleTextAreaChange}
            style={{ backgroundColor: jsonError ? '#ffb4b4' : 'white' }}
        />
        {
            jsonError ?
                <div style={{ color: 'red' }}>{jsonError}</div>
                : <div>{
                    allPassed === true ?
                        texts.allPassed :
                        allPassed === false ?
                            texts.someFailed : texts.invalidInputString
                }</div>
        }
    </div>
};

const TestCasesDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <>
        <div className="test-case-tabs">
            <button>JSON</button>
            <button disabled className="tooltip tooltip-unimplemented">
                Plain text
            </button>
        </div>
        <Validator isPositive={true} texts={
            {
                title: t.positiveTestCases,
                allPassed: t.allPositiveTestCasesPassed,
                someFailed: t.somePositiveTestCasesFailed,
                invalidInputString: t.invalidInput,
                invalidJSON: t.invalidJSON
            }
        } dfa={dfa} initialTestCases={["01", "101", "001", "111101"]} />
        <Validator isPositive={false} texts={
            {
                title: t.negativeTestCases,
                allPassed: t.allNegativeTestCasesPassed,
                someFailed: t.someNegativeTestCasesFailed,
                invalidInputString: t.invalidInput,
                invalidJSON: t.invalidJSON
            }
        } dfa={dfa} initialTestCases={["100", "0010", "1110", "01010111"]} />
    </>;
}

const TestCasesPanelDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <Panel title={t.testCases}>
        <TestCasesDfa dfa={dfa} lang={lang} />
    </Panel>
}
export default TestCasesPanelDfa;