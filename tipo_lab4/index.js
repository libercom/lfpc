import ChomskyNormalForm from "./chomsky";
import Combinations from "./combinatios";
import Grammar from "./grammar";
import readGrammarFromFile from "./readGrammarFromFile";

const grammarString = readGrammarFromFile("./grammar.txt");
const grammar = new Grammar(grammarString);

const chomsky = new ChomskyNormalForm(grammar);

chomsky.eliminateEpsilon();
chomsky.eliminateRenamings();
chomsky.eliminateUnreacheable();
chomsky.eliminateUnproductive();

console.log(chomsky.getFinalForm());
