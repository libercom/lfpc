const fs = require("fs");

export default function readCodeFromFile(filePath) {
    return fs.readFileSync(filePath).toString();
}
