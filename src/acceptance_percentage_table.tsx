import { DFA } from "./types_automaton";

const AcceptancePrecentageTableDfa: React.FC<{ dfa: DFA, lang: "en-US" | "en-UK" | "ja" }> = ({ dfa, lang }) => {
    const translations = {
        "en-US": {

            "length": "Length",
            "accepted": "Accepted",
            "rejected": "Rejected",
            "acceptanceRate": "Acceptance Rate",
        },
        "en-UK": {

            "length": "Length",
            "accepted": "Accepted",
            "rejected": "Rejected",
            "acceptanceRate": "Acceptance Rate",
        },
        "ja": {

            "length": "文字列長",
            "accepted": "受理する文字列の個数",
            "rejected": "拒否する文字列の個数",
            "acceptanceRate": "受理率",
        }
    };
    const t = translations[lang];
    return <table className="acceptance-percentage-table">
        <thead>
            <tr><th>{t.length}</th><th>{t.accepted}</th><th>{t.rejected}</th><th>{t.acceptanceRate}</th></tr>
        </thead>
        <tbody>
            <tr><td>0</td><td>0</td><td>1</td><td>0%</td></tr>
            <tr><td>1</td><td>0</td><td>2</td><td>0%</td></tr>
            <tr><td>2</td><td>1</td><td>3</td><td>25%</td></tr>
            <tr><td>3</td><td>2</td><td>6</td><td>25%</td></tr>
            <tr><td>4</td><td>4</td><td>12</td><td>25%</td></tr>
            <tr><td>5</td><td>8</td><td>24</td><td>25%</td></tr>
        </tbody>
    </table>
}

export default AcceptancePrecentageTableDfa;