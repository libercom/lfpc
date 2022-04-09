import Combinations from "./combinatios";

export default function ChomskyNormalForm(grammar) {
    let _grammar = grammar;

    function eliminateEpsilon() {
        let hasEpsilon = true;
        let epsilonPivot;

        while (hasEpsilon) {
            hasEpsilon = false;

            for (const key in _grammar) {
                for (let index = 0; index < _grammar[key].length; index++) {
                    const element = _grammar[key][index];

                    if (element === "@") {
                        _grammar[key].splice(index, 1);
                        hasEpsilon = true;
                        epsilonPivot = key;
                        break;
                    }
                }

                if (hasEpsilon) {
                    break;
                }
            }

            if (hasEpsilon) {
                for (const key in _grammar) {
                    // if (key !== epsilonPivot) {
                    for (let index = 0; index < _grammar[key].length; index++) {
                        const element = _grammar[key][index];
                        const combinations = new Combinations(
                            element,
                            epsilonPivot
                        );

                        _grammar[key].push(...combinations.get());
                        _grammar[key] = [...new Set(_grammar[key])];
                        // console.log(_grammar[key]);
                    }
                    // }
                }
            }
        }
    }

    function eliminateRenamings() {
        let hasRenaming = true;

        while (hasRenaming) {
            hasRenaming = false;

            for (const key in _grammar) {
                for (let index = 0; index < _grammar[key].length; index++) {
                    const element = _grammar[key][index];

                    if (element in _grammar) {
                        const renaming = _grammar[element];

                        _grammar[key].splice(index, 1);
                        _grammar[key].push(...renaming);
                        _grammar[key] = [...new Set(_grammar[key])];
                        hasRenaming = true;
                    }
                }
            }
        }
    }

    function eliminateUnproductive() {
        let productive = {};

        for (const key in _grammar) {
            productive[key] = false;
        }

        for (const key in _grammar) {
            for (let index = 0; index < _grammar[key].length; index++) {
                const element = _grammar[key][index];

                if (element.length === 1 && element.toLowerCase() === element) {
                    productive[key] = true;
                }
            }
        }

        for (const key in _grammar) {
            if (!productive[key]) {
                for (let index = 0; index < _grammar[key].length; index++) {
                    const element = _grammar[key][index];
                    const states = element.split("");
                    let check = true;

                    for (let index = 0; index < states.length; index++) {
                        const state = states[index];

                        if (
                            !(
                                state.toLowerCase() === state ||
                                productive[state]
                            )
                        ) {
                            check = false;
                            break;
                        }
                    }

                    if (check) {
                        productive[key] = true;
                        break;
                    }
                }
            }
        }

        for (const key in _grammar) {
            if (!productive[key]) {
                delete _grammar[key];
            }
        }
    }

    function eliminateUnreacheable() {
        let reachable = {};

        for (const key in _grammar) {
            reachable[key] = false;
        }

        reachable["S"] = true;

        for (const key in _grammar) {
            _grammar[key].forEach((x) => {
                x.split("").forEach((element) => {
                    if (element in _grammar) {
                        reachable[element] = true;
                    }
                });
            });
        }

        for (const key in _grammar) {
            if (!reachable[key]) {
                delete _grammar[key];
            }
        }
    }

    function getFinalForm() {
        const availableLabels = getAvailableLabels();
        let newStates = {};

        for (const key in _grammar) {
            for (let index = 0; index < _grammar[key].length; index++) {
                let element = _grammar[key][index];

                if (element.length === 1) {
                    continue;
                } else if (
                    element.length === 2 &&
                    element.toUpperCase() !== element
                ) {
                    let state;

                    if (element[0].toLowerCase() === element[0]) {
                        if (!(element[0] in newStates)) {
                            state = availableLabels.shift();
                            newStates[element[0]] = state;
                        } else {
                            state = newStates[element[0]];
                        }

                        let value = state + element[1];

                        _grammar[key][index] = value;
                        _grammar[state] = element[0];
                    } else {
                        if (!(element[1] in newStates)) {
                            state = availableLabels.shift();
                            newStates[element[1]] = state;
                        } else {
                            state = newStates[element[1]];
                        }

                        let value = element[0] + state;

                        _grammar[key][index] = value;
                        _grammar[state] = element[1];
                    }
                } else if (element.length > 2) {
                    while (element.length > 2) {
                        element = _grammar[key][index];
                        const elementSlice = element.slice(0, 2);
                        const remainingSlice = element.slice(2);

                        if (
                            element.length === 2 &&
                            element.toUpperCase() === element
                        )
                            break;

                        if (elementSlice.toUpperCase() !== elementSlice) {
                            let state;

                            if (
                                elementSlice[0].toLowerCase() ===
                                elementSlice[0]
                            ) {
                                if (!(elementSlice[0] in newStates)) {
                                    state = availableLabels.shift();
                                    newStates[elementSlice[0]] = state;
                                } else {
                                    state = newStates[elementSlice[0]];
                                }

                                let value =
                                    state + elementSlice[1] + remainingSlice;

                                _grammar[key][index] = value;
                                _grammar[state] = elementSlice[0];
                            } else {
                                if (!(elementSlice[1] in newStates)) {
                                    state = availableLabels.shift();
                                    newStates[elementSlice[1]] = state;
                                } else {
                                    state = newStates[elementSlice[1]];
                                }

                                let value =
                                    elementSlice[0] + state + remainingSlice;

                                _grammar[key][index] = value;
                                _grammar[state] = elementSlice[1];
                            }
                        } else {
                            let state;

                            if (!(elementSlice in newStates)) {
                                state = availableLabels.shift();
                                newStates[elementSlice] = state;
                            } else {
                                state = newStates[elementSlice];
                            }

                            let value = state + remainingSlice;

                            _grammar[key][index] = value;
                            _grammar[state] = elementSlice;
                        }
                    }
                }
            }
        }

        return _grammar;
    }

    function getAvailableLabels() {
        const alpha = Array.from(Array(26)).map((_, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        const result = alphabet.filter((x) => !(x in _grammar));

        return result;
    }

    return {
        grammar: _grammar,
        eliminateEpsilon,
        eliminateRenamings,
        eliminateUnreacheable,
        eliminateUnproductive,
        getFinalForm,
    };
}
