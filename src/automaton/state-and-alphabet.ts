export type AutomatonState = string & { readonly AutomatonState: unique symbol };
export type Alphabet = string & { readonly Alphabet: unique symbol };
export function getIthAlphabet(i: number): Alphabet {
    return String.fromCharCode(48 + i) as Alphabet;
}

export function getIthAutomatonState(i: number): AutomatonState {
    return String.fromCharCode(97 + i) as AutomatonState;
}