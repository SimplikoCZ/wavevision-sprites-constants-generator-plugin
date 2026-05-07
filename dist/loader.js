"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delimiter = '\n';
const replace = [
    /fill="#[a-z0-9]{3,6}"/g,
    'fill="currentColor"',
];
const makeExport = (source) => `export default ${source}`;
const loader = (source) => makeExport(source
    .split(delimiter)
    .filter(svg => svg !== '')
    .map(svg => svg.replace(...replace))
    .join(delimiter));
exports.default = loader;
//# sourceMappingURL=loader.js.map