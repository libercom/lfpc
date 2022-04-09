export default function Combinations(str, ch) {
    let _str = str;
    let _ch = ch;
    let _result = {};

    _result[_str] = _str;

    function figureCombinations(str, idx) {
        let current = str.indexOf(_ch, idx);

        if (current === -1) {
            return;
        }

        let newString = str
            .split("")
            .filter((_, id) => id != current)
            .join("");

        if (newString in _result) {
            return;
        }

        _result[newString] = newString;

        figureCombinations(newString, idx + 1);
    }

    function get() {
        if (_str === _ch) {
            return ["@"];
        }

        figureCombinations(_str, 0);
        figureCombinations(_str, 1);

        let result = [];

        for (const item in _result) {
            result.push(item);
        }

        return result.sort();
    }

    return {
        get,
    };
}
