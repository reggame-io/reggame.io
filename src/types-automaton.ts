export type AutomatonState = string & { readonly AutomatonState: unique symbol };
export type Alphabet = string & { readonly Alphabet: unique symbol };
export type DFA = {
    initial_state: 'a' & AutomatonState,
    states: ReadonlyArray<AutomatonState>,
    alphabets: ReadonlyArray<Alphabet>,
    transition_table: ReadonlyMap<AutomatonState, ReadonlyMap<Alphabet, AutomatonState>>,
    accept_states: ReadonlyArray<AutomatonState>
};

export function getIthAlphabet(i: number): Alphabet {
    return String.fromCharCode(48 + i) as Alphabet;
}

export function getIthAutomatonState(i: number): AutomatonState {
    return String.fromCharCode(97 + i) as AutomatonState;
}