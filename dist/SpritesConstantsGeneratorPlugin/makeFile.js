"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = require("handlebars");
const declare = '<?php declare (strict_types = 1);';
const template = (0, handlebars_1.compile)(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '..', 'template.hbs')).toString());
const makeFile = (className, constants, options) => {
    const { namespace, output, useStaticClass, useStrictTypes } = options;
    if (!fs_1.default.existsSync(output)) {
        fs_1.default.mkdirSync(output, { recursive: true });
    }
    fs_1.default.writeFileSync(path_1.default.resolve(output, `${className}.php`), template({
        className,
        constants,
        declare,
        namespace,
        useStaticClass,
        useStrictTypes,
    }), 'utf8');
    return `${namespace}\\${className} created`;
};
exports.default = makeFile;
//# sourceMappingURL=makeFile.js.map