export default function Grammar(str) {
    let _str = str;
    let _grammar = {};

    _str.replaceAll("\r", "")
        .split("\n")
        .forEach((x) => {
            const [key, value] = x.split(" ");

            if (!(key in _grammar)) {
                _grammar[key] = [];
            }

            _grammar[key].push(value);
        });

    return _grammar;
}
