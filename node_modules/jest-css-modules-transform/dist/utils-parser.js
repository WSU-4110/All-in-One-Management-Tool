"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileCache = exports.extractUrls = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const extractUrls = (prependConfig, filepath) => {
    const urls = [];
    if (typeof prependConfig === 'string') {
        urls.push(prependConfig);
    }
    else if (Array.isArray(prependConfig)) {
        for (const prepentItem of prependConfig) {
            if (typeof prepentItem === 'string') {
                urls.push(prepentItem);
            }
            else {
                const dynamicUrls = prepentItem(filepath);
                if (Array.isArray(dynamicUrls)) {
                    urls.push(...dynamicUrls);
                }
                else {
                    urls.push(dynamicUrls);
                }
            }
        }
    }
    else if (typeof prependConfig === 'function') {
        const dynamicUrls = prependConfig(filepath);
        if (Array.isArray(dynamicUrls)) {
            urls.push(...dynamicUrls);
        }
        else {
            urls.push(dynamicUrls);
        }
    }
    return urls.filter(Boolean);
};
exports.extractUrls = extractUrls;
const createFileCache = (cwd) => {
    const cache = new Map();
    return (filepath) => {
        const normalizedPath = path_1.default.isAbsolute(filepath) ? filepath : path_1.default.resolve(cwd, filepath);
        if (cache.has(normalizedPath)) {
            return cache.get(normalizedPath);
        }
        const fileData = fs_1.default.readFileSync(normalizedPath, { encoding: 'utf-8' });
        cache.set(normalizedPath, fileData);
        return fileData;
    };
};
exports.createFileCache = createFileCache;
