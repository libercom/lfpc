/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./chomsky.js":
/*!********************!*\
  !*** ./chomsky.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ChomskyNormalForm)\n/* harmony export */ });\n/* harmony import */ var _combinatios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./combinatios */ \"./combinatios.js\");\n\r\n\r\nfunction ChomskyNormalForm(grammar) {\r\n    let _grammar = grammar;\r\n\r\n    function eliminateEpsilon() {\r\n        let hasEpsilon = true;\r\n        let epsilonPivot;\r\n\r\n        while (hasEpsilon) {\r\n            hasEpsilon = false;\r\n\r\n            for (const key in _grammar) {\r\n                for (let index = 0; index < _grammar[key].length; index++) {\r\n                    const element = _grammar[key][index];\r\n\r\n                    if (element === \"@\") {\r\n                        _grammar[key].splice(index, 1);\r\n                        hasEpsilon = true;\r\n                        epsilonPivot = key;\r\n                        break;\r\n                    }\r\n                }\r\n\r\n                if (hasEpsilon) {\r\n                    break;\r\n                }\r\n            }\r\n\r\n            if (hasEpsilon) {\r\n                for (const key in _grammar) {\r\n                    // if (key !== epsilonPivot) {\r\n                    for (let index = 0; index < _grammar[key].length; index++) {\r\n                        const element = _grammar[key][index];\r\n                        const combinations = new _combinatios__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n                            element,\r\n                            epsilonPivot\r\n                        );\r\n\r\n                        _grammar[key].push(...combinations.get());\r\n                        _grammar[key] = [...new Set(_grammar[key])];\r\n                        // console.log(_grammar[key]);\r\n                    }\r\n                    // }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    function eliminateRenamings() {\r\n        let hasRenaming = true;\r\n\r\n        while (hasRenaming) {\r\n            hasRenaming = false;\r\n\r\n            for (const key in _grammar) {\r\n                for (let index = 0; index < _grammar[key].length; index++) {\r\n                    const element = _grammar[key][index];\r\n\r\n                    if (element in _grammar) {\r\n                        const renaming = _grammar[element];\r\n\r\n                        _grammar[key].splice(index, 1);\r\n                        _grammar[key].push(...renaming);\r\n                        _grammar[key] = [...new Set(_grammar[key])];\r\n                        hasRenaming = true;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    function eliminateUnproductive() {\r\n        let productive = {};\r\n\r\n        for (const key in _grammar) {\r\n            productive[key] = false;\r\n        }\r\n\r\n        for (const key in _grammar) {\r\n            for (let index = 0; index < _grammar[key].length; index++) {\r\n                const element = _grammar[key][index];\r\n\r\n                if (element.length === 1 && element.toLowerCase() === element) {\r\n                    productive[key] = true;\r\n                }\r\n            }\r\n        }\r\n\r\n        for (const key in _grammar) {\r\n            if (!productive[key]) {\r\n                for (let index = 0; index < _grammar[key].length; index++) {\r\n                    const element = _grammar[key][index];\r\n                    const states = element.split(\"\");\r\n                    let check = true;\r\n\r\n                    for (let index = 0; index < states.length; index++) {\r\n                        const state = states[index];\r\n\r\n                        if (\r\n                            !(\r\n                                state.toLowerCase() === state ||\r\n                                productive[state]\r\n                            )\r\n                        ) {\r\n                            check = false;\r\n                            break;\r\n                        }\r\n                    }\r\n\r\n                    if (check) {\r\n                        productive[key] = true;\r\n                        break;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n        for (const key in _grammar) {\r\n            if (!productive[key]) {\r\n                delete _grammar[key];\r\n            }\r\n        }\r\n    }\r\n\r\n    function eliminateUnreacheable() {\r\n        let reachable = {};\r\n\r\n        for (const key in _grammar) {\r\n            reachable[key] = false;\r\n        }\r\n\r\n        reachable[\"S\"] = true;\r\n\r\n        for (const key in _grammar) {\r\n            _grammar[key].forEach((x) => {\r\n                x.split(\"\").forEach((element) => {\r\n                    if (element in _grammar) {\r\n                        reachable[element] = true;\r\n                    }\r\n                });\r\n            });\r\n        }\r\n\r\n        for (const key in _grammar) {\r\n            if (!reachable[key]) {\r\n                delete _grammar[key];\r\n            }\r\n        }\r\n    }\r\n\r\n    function getFinalForm() {\r\n        const availableLabels = getAvailableLabels();\r\n        let newStates = {};\r\n\r\n        for (const key in _grammar) {\r\n            for (let index = 0; index < _grammar[key].length; index++) {\r\n                let element = _grammar[key][index];\r\n\r\n                if (element.length === 1) {\r\n                    continue;\r\n                } else if (\r\n                    element.length === 2 &&\r\n                    element.toUpperCase() !== element\r\n                ) {\r\n                    let state;\r\n\r\n                    if (element[0].toLowerCase() === element[0]) {\r\n                        if (!(element[0] in newStates)) {\r\n                            state = availableLabels.shift();\r\n                            newStates[element[0]] = state;\r\n                        } else {\r\n                            state = newStates[element[0]];\r\n                        }\r\n\r\n                        let value = state + element[1];\r\n\r\n                        _grammar[key][index] = value;\r\n                        _grammar[state] = element[0];\r\n                    } else {\r\n                        if (!(element[1] in newStates)) {\r\n                            state = availableLabels.shift();\r\n                            newStates[element[1]] = state;\r\n                        } else {\r\n                            state = newStates[element[1]];\r\n                        }\r\n\r\n                        let value = element[0] + state;\r\n\r\n                        _grammar[key][index] = value;\r\n                        _grammar[state] = element[1];\r\n                    }\r\n                } else if (element.length > 2) {\r\n                    while (element.length > 2) {\r\n                        element = _grammar[key][index];\r\n                        const elementSlice = element.slice(0, 2);\r\n                        const remainingSlice = element.slice(2);\r\n\r\n                        if (\r\n                            element.length === 2 &&\r\n                            element.toUpperCase() === element\r\n                        )\r\n                            break;\r\n\r\n                        if (elementSlice.toUpperCase() !== elementSlice) {\r\n                            let state;\r\n\r\n                            if (\r\n                                elementSlice[0].toLowerCase() ===\r\n                                elementSlice[0]\r\n                            ) {\r\n                                if (!(elementSlice[0] in newStates)) {\r\n                                    state = availableLabels.shift();\r\n                                    newStates[elementSlice[0]] = state;\r\n                                } else {\r\n                                    state = newStates[elementSlice[0]];\r\n                                }\r\n\r\n                                let value =\r\n                                    state + elementSlice[1] + remainingSlice;\r\n\r\n                                _grammar[key][index] = value;\r\n                                _grammar[state] = elementSlice[0];\r\n                            } else {\r\n                                if (!(elementSlice[1] in newStates)) {\r\n                                    state = availableLabels.shift();\r\n                                    newStates[elementSlice[1]] = state;\r\n                                } else {\r\n                                    state = newStates[elementSlice[1]];\r\n                                }\r\n\r\n                                let value =\r\n                                    elementSlice[0] + state + remainingSlice;\r\n\r\n                                _grammar[key][index] = value;\r\n                                _grammar[state] = elementSlice[1];\r\n                            }\r\n                        } else {\r\n                            let state;\r\n\r\n                            if (!(elementSlice in newStates)) {\r\n                                state = availableLabels.shift();\r\n                                newStates[elementSlice] = state;\r\n                            } else {\r\n                                state = newStates[elementSlice];\r\n                            }\r\n\r\n                            let value = state + remainingSlice;\r\n\r\n                            _grammar[key][index] = value;\r\n                            _grammar[state] = elementSlice;\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n        return _grammar;\r\n    }\r\n\r\n    function getAvailableLabels() {\r\n        const alpha = Array.from(Array(26)).map((_, i) => i + 65);\r\n        const alphabet = alpha.map((x) => String.fromCharCode(x));\r\n        const result = alphabet.filter((x) => !(x in _grammar));\r\n\r\n        return result;\r\n    }\r\n\r\n    return {\r\n        grammar: _grammar,\r\n        eliminateEpsilon,\r\n        eliminateRenamings,\r\n        eliminateUnreacheable,\r\n        eliminateUnproductive,\r\n        getFinalForm,\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://lab4/./chomsky.js?");

/***/ }),

/***/ "./combinatios.js":
/*!************************!*\
  !*** ./combinatios.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Combinations)\n/* harmony export */ });\nfunction Combinations(str, ch) {\r\n    let _str = str;\r\n    let _ch = ch;\r\n    let _result = {};\r\n\r\n    _result[_str] = _str;\r\n\r\n    function figureCombinations(str, idx) {\r\n        let current = str.indexOf(_ch, idx);\r\n\r\n        if (current === -1) {\r\n            return;\r\n        }\r\n\r\n        let newString = str\r\n            .split(\"\")\r\n            .filter((_, id) => id != current)\r\n            .join(\"\");\r\n\r\n        if (newString in _result) {\r\n            return;\r\n        }\r\n\r\n        _result[newString] = newString;\r\n\r\n        figureCombinations(newString, idx + 1);\r\n    }\r\n\r\n    function get() {\r\n        if (_str === _ch) {\r\n            return [\"@\"];\r\n        }\r\n\r\n        figureCombinations(_str, 0);\r\n        figureCombinations(_str, 1);\r\n\r\n        let result = [];\r\n\r\n        for (const item in _result) {\r\n            result.push(item);\r\n        }\r\n\r\n        return result.sort();\r\n    }\r\n\r\n    return {\r\n        get,\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://lab4/./combinatios.js?");

/***/ }),

/***/ "./grammar.js":
/*!********************!*\
  !*** ./grammar.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Grammar)\n/* harmony export */ });\nfunction Grammar(str) {\r\n    let _str = str;\r\n    let _grammar = {};\r\n\r\n    _str.replaceAll(\"\\r\", \"\")\r\n        .split(\"\\n\")\r\n        .forEach((x) => {\r\n            const [key, value] = x.split(\" \");\r\n\r\n            if (!(key in _grammar)) {\r\n                _grammar[key] = [];\r\n            }\r\n\r\n            _grammar[key].push(value);\r\n        });\r\n\r\n    return _grammar;\r\n}\r\n\n\n//# sourceURL=webpack://lab4/./grammar.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chomsky__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chomsky */ \"./chomsky.js\");\n/* harmony import */ var _combinatios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combinatios */ \"./combinatios.js\");\n/* harmony import */ var _grammar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grammar */ \"./grammar.js\");\n/* harmony import */ var _readGrammarFromFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./readGrammarFromFile */ \"./readGrammarFromFile.js\");\n\r\n\r\n\r\n\r\n\r\nconst grammarString = (0,_readGrammarFromFile__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"./grammar.txt\");\r\nconst grammar = new _grammar__WEBPACK_IMPORTED_MODULE_2__[\"default\"](grammarString);\r\n\r\nconst chomsky = new _chomsky__WEBPACK_IMPORTED_MODULE_0__[\"default\"](grammar);\r\n\r\nchomsky.eliminateEpsilon();\r\nchomsky.eliminateRenamings();\r\nchomsky.eliminateUnreacheable();\r\nchomsky.eliminateUnproductive();\r\n\r\nconsole.log(chomsky.getFinalForm());\r\nconsole.log(chomsky.grammar);\r\n\n\n//# sourceURL=webpack://lab4/./index.js?");

/***/ }),

/***/ "./readGrammarFromFile.js":
/*!********************************!*\
  !*** ./readGrammarFromFile.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ readGrammarFromFile)\n/* harmony export */ });\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\n\r\nfunction readGrammarFromFile(path) {\r\n    return fs.readFileSync(path).toString();\r\n}\r\n\n\n//# sourceURL=webpack://lab4/./readGrammarFromFile.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;