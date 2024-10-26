import { DFA } from "./types_automaton";
import { AutomatonState } from "./types_automaton";

function countAcceptedWithinFixedLength(dfa: DFA, length: number): number {
    const map: Map<AutomatonState, number> = new Map();
    map.set(dfa.initial_state, 1);
    for (let i = 0; i < length; i++) {
        const new_map: Map<AutomatonState, number> = new Map();
        for (const [state, count] of map) {
            for (const alphabet of dfa.alphabets) {
                const next_state = dfa.transition_table.get(state)?.get(alphabet);
                if (next_state !== undefined) {
                    new_map.set(next_state, (new_map.get(next_state) || 0) + count);
                }
            }
        }
        map.clear();
        for (const [state, count] of new_map) {
            map.set(state, count);
        }
    }
    let accepted = 0;
    for (const [state, count] of map) {
        if (dfa.accept_states.includes(state)) {
            accepted += count;
        }
    }
    return accepted;
}

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
            {
                Array.from({ length: dfa.states.length * 2 }, (_, i) => {
                    const length = i;
                    const accepted = countAcceptedWithinFixedLength(dfa, length);
                    const rejected = Math.pow(dfa.alphabets.length, i) - accepted;
                    const acceptanceRate = `${Math.round(accepted / (accepted + rejected) * 100)}%`;
                    return <tr key={i}><td>{length}</td><td>{accepted}</td><td>{rejected}</td><td>{acceptanceRate}</td></tr>
                })
            }
        </tbody>
    </table>
}

export default AcceptancePrecentageTableDfa;