"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readStream = exports.requirePostcssConfig = exports.getPreProcessorsConfig = void 0;
exports.getPreProcessorsConfig = (function wrap() {
    const preProcessorsConfigDefalut = {
        sassConfig: {},
        lessConfig: {},
        stylusConfig: {},
        cssLoaderConfig: {},
        sassModuleName: '',
        injectIntoDOM: false,
    };
    return (configPath) => {
        try {
            return require(configPath) || preProcessorsConfigDefalut;
        }
        catch (e) {
            return preProcessorsConfigDefalut;
        }
    };
})();
const requirePostcssConfig = (postcssConfigPath) => {
    try {
        return require(postcssConfigPath) || null;
    }
    catch (e) {
        return null;
    }
};
exports.requirePostcssConfig = requirePostcssConfig;
async function readStream(stream, render) {
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    render(`${buffer.toString('utf8')}\n\r`);
}
exports.readStream = readStream;
