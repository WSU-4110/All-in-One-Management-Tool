"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = __importDefault(require("postcss"));
const fs_1 = require("fs");
const utils_1 = require("./utils");
const [, , filePath, configPath, postcssConfigPath, prependContentFlag] = process.argv;
// eslint-disable-next-line no-console, @typescript-eslint/no-empty-function
const originalConsoleLog = console.log;
// eslint-disable-next-line no-console, @typescript-eslint/no-empty-function
console.log = () => { };
// eslint-disable-next-line no-console, @typescript-eslint/no-empty-function
console.warn = () => { };
// eslint-disable-next-line no-console, @typescript-eslint/no-empty-function
console.info = () => { };
const postcssConfig = (0, utils_1.getPreProcessorsConfig)(configPath).postcssConfig || (0, utils_1.requirePostcssConfig)(postcssConfigPath) || {};
const render = (prependedContent) => {
    (0, postcss_1.default)(postcssConfig.plugins || [])
        .process(`${prependedContent}${(0, fs_1.readFileSync)(filePath, { encoding: 'utf-8' })}`, {
        from: filePath,
    })
        .then(({ css }) => {
        originalConsoleLog.call(console, css);
    }, (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
    });
};
if (prependContentFlag === '1') {
    (0, utils_1.readStream)(process.stdin, render);
}
else {
    render('');
}
