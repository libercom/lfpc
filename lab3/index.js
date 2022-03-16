import readCodeFromFile from "./files";
import Lexer from "./lexer";
import { TokenType } from "./token";

// const code = `fn fn1(a, b) {
//     return a + b;
// }

// gn gn1(a, b) {
//     yield return a;
//     yield return b;
// }

// async fn fn2(a, b) {
//     return a + b;
// }

// if (1 == 2) {
//     fn1(1, 2);
// } else if (1 != 2) {
//     gn1(1, 2);
// } else if (1 >= 2) {
//     await fn2(1, 2);
// }

// let a = 1;
// let b = 2;

// // this is a comment

// for (;;) {
//     a++;
//     b--;
// }
// `;

const code = readCodeFromFile(process.argv[2]);

let l = new Lexer();

l.init(code);

let token = l.nextToken();

console.log("[");

while (token.type !== TokenType.EOF) {
    console.log(
        `{\n\tToken Type: '${token.type}',\n\tToken Value: '${token.value}'\n},\n`
    );
    token = l.nextToken();
}

console.log("]");
