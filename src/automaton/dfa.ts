import { AutomatonState, Alphabet } from "./state-and-alphabet";

export type DFA = {
    initial_state: 'a' & AutomatonState,
    states: ReadonlyArray<AutomatonState>,
    alphabets: ReadonlyArray<Alphabet>,
    transition_table: ReadonlyMap<AutomatonState, ReadonlyMap<Alphabet, AutomatonState>>,
    accept_states: ReadonlyArray<AutomatonState>
};