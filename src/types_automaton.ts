export type State = string;
export type Alphabet = string;
export type DFA = {
    initial_state: 'a',
    states: State[],
    alphabets: Alphabet[],
    transition_table: Map<State, Map<Alphabet, State>>,
    accept_states: State[]
};
