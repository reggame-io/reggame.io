import './transition-table.css';
import { DFA, runAutomaton } from '../automaton/dfa';
import { UnimplementedPanel } from '../panel';

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

    const positiveTestCases = JSON.parse('["01", "101", "001", "111101"]');
    const negativeTestCases = JSON.parse('["100", "0010", "1110", "01010111"]');

    const positiveResult = runTestCases(dfa, positiveTestCases, true);
    const negativeResult = runTestCases(dfa, negativeTestCases, false);

    return <>
        <div className="test-case-tabs">
            <button>JSON</button>
            <button disabled className="tooltip tooltip-unimplemented">
                Plain text
            </button>
        </div>
        <div>
            <h3>{t.positiveTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={JSON.stringify(positiveTestCases)} />
            <div>{positiveResult ? "All positive test cases passed" : "Some positive test cases failed"}</div>
        </div>
        <div>
            <h3>{t.negativeTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={JSON.stringify(negativeTestCases)} />
            <div>{negativeResult ? "All negative test cases passed" : "Some negative test cases failed"}</div>
        </div>
    </>;
}

const TestCasesPanelDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const t = translations[lang];
    return <UnimplementedPanel title={t.testCases}>
        <TestCasesDfa dfa={dfa} lang={lang} />
    </UnimplementedPanel>
}
export default TestCasesPanelDfa;