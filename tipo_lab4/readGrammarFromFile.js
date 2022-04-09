const fs = require("fs");

export default function readGrammarFromFile(path) {
    return fs.readFileSync(path).toString();
}
