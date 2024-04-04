"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = __importDefault(require("postcss"));
const camelcase_1 = __importDefault(require("camelcase"));
const dashesCamelCase = (str) => str.replace(/-+(\w)/g, (match, firstLetter) => firstLetter.toUpperCase());
class Parser {
    constructor(cssLoaderConfig) {
        this._cssLoaderConfig = cssLoaderConfig || {};
    }
    pushToResult(result, className) {
        switch (this._cssLoaderConfig.exportLocalsStyle) {
            case 'camelCase':
                result[className] = className;
                result[(0, camelcase_1.default)(className)] = className;
                break;
            case 'camelCaseOnly':
                result[(0, camelcase_1.default)(className)] = className;
                break;
            case 'dashes':
                result[className] = className;
                result[dashesCamelCase(className)] = className;
                break;
            case 'dashesOnly':
                result[dashesCamelCase(className)] = className;
                break;
            default:
                result[className] = className;
        }
    }
    getCSSSelectors(css) {
        const vars = {};
        const result = {};
        const resultAnimations = {};
        const walk = (node) => {
            if (!node) {
                return;
            }
            if (node.type === 'rule') {
                if (node.selector) {
                    node.selector.split(/[\s,~+>()]+/).forEach((str) => {
                        const strs = str.match(/[.#][^.#]+/g);
                        if (strs) {
                            strs.forEach((name) => {
                                this.pushToResult(result, name.slice(1).replace(/\\/g, '').replace(/:.*/g, ''));
                            });
                        }
                    });
                }
            }
            else if (node.type === 'atrule') {
                if (node.name === 'keyframes' && node.params) {
                    this.pushToResult(resultAnimations, node.params);
                }
            }
            else if (node.type === 'decl') {
                if (node.prop && node.parent && node.parent.selector === ':export') {
                    vars[node.prop] = node.value;
                    const camelCaseKey = (0, camelcase_1.default)(node.prop);
                    if (!(camelCaseKey in vars)) {
                        vars[camelCaseKey] = node.value;
                    }
                }
            }
            if ('nodes' in node) {
                node.nodes.forEach(walk);
            }
        };
        if (typeof css === 'string') {
            walk(postcss_1.default.parse(css));
        }
        else {
            walk(css.root);
        }
        return Object.assign(vars, result, resultAnimations);
    }
}
exports.default = Parser;
