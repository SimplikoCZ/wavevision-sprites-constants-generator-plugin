"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterClassName = void 0;
const capitalize_1 = __importDefault(require("@wavevision/ts-utils/strings/capitalize"));
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const filterClassName = (className) => (0, capitalize_1.default)((0, lodash_camelcase_1.default)(className));
exports.filterClassName = filterClassName;
//# sourceMappingURL=utils.js.map