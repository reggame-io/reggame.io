import './transition-table.css';
import { DFA } from '../automaton/dfa';
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

const TestCasesDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {

    const t = translations[lang];

    return <>
        <div className="test-case-tabs">
            <button>JSON</button>
            <button disabled className="tooltip tooltip-unimplemented">
                Plain text
            </button>
        </div>
        <div>
            <h3>{t.positiveTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={`["01", "101", "001", "111101"]`} />
        </div>
        <div>
            <h3>{t.negativeTestCases}</h3>
            <textarea rows={4} cols={30} defaultValue={`["100", "0010", "1110", "01010111"]`} />
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