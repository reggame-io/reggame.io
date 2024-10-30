import { AutomatonState, Alphabet } from "./state-and-alphabet";

export type DFA = {
    initial_state: 'a' & AutomatonState,
    states: ReadonlyArray<AutomatonState>,
    alphabets: ReadonlyArray<Alphabet>,
    transition_table: ReadonlyMap<AutomatonState, ReadonlyMap<Alphabet, AutomatonState>>,
    accept_states: ReadonlyArray<AutomatonState>
};

export function runSingleStep(dfa: DFA, state: AutomatonState, char: Alphabet): AutomatonState {
    return dfa.transition_table.get(state)!.get(char as Alphabet)!;
}

export function runAutomaton(dfa: DFA, input_str: string): boolean {
    let state: AutomatonState = dfa.initial_state;
    for (const char of input_str) {
        if (dfa.alphabets.includes(char as Alphabet) === false) {
            throw new Error(`Invalid character: the alphabet set is {"${
                dfa.alphabets.join('", "')
            }"} but encountered a character "${char}"`);
        }
        state = runSingleStep(dfa, state, char as Alphabet);
    }
    return dfa.accept_states.includes(state);
}

export function getGraphvizSource(dfa: DFA): string {
    return `digraph finite_state_machine {
    node [shape = doublecircle]; ${dfa.accept_states.length ?
            dfa.accept_states.join(", ") + ";" : ""}
    node [shape = circle];
    "" [shape=none];
${[
            ...dfa.transition_table.entries()

        ].map(([state, inner_map]) => {
            return Array.from(inner_map.entries()).map(([c, dest]) => {
                return `    ${state} -> ${dest} [label = "${c}"];`
            }).join("\n")
        }).join("\n")
        }
    "" -> a
}`;
}