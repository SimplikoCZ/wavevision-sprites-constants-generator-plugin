"use strict";
const runtimeGenerator = ({ symbol }) => `export default ${JSON.stringify(symbol.id)}`;
module.exports = runtimeGenerator;
//# sourceMappingURL=runtimeGenerator.js.map