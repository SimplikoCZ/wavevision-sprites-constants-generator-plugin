"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const schema_utils_1 = require("schema-utils");
const Generator_1 = __importDefault(require("./Generator"));
const schema_1 = __importDefault(require("./schema"));
const DIST = (0, path_1.resolve)(__dirname, '..', '..', 'dist');
const NAME = 'SpritesConstantsGeneratorPlugin';
class SpritesConstantsGeneratorPlugin {
    constructor(options) {
        this.defaults = {
            ignoreErrors: false,
            useStaticClass: true,
            useStrictTypes: true,
        };
        this.apply = (compiler) => {
            compiler.hooks.thisCompilation.tap(NAME, compilation => {
                this.logger = compilation.getLogger(NAME);
            });
            compiler.hooks.afterEmit.tapAsync(NAME, this.run);
        };
        this.run = (compilation, callback) => {
            if (this.shouldRun(compilation)) {
                try {
                    const messages = this.generator.run(this.getAssets(compilation));
                    this.logger.group(NAME);
                    messages.forEach(m => this.logger.info(m));
                    this.logger.groupEnd();
                }
                catch (e) {
                    const err = new Error(`${NAME}: ${e.message}`);
                    compilation.errors.push(err);
                }
            }
            callback();
        };
        this.getAssets = (compilation) => {
            const assets = {};
            const outputPath = compilation.outputOptions.path;
            for (const asset in compilation.assets) {
                if (this.options.sprites.includes(asset)) {
                    const filePath = (0, path_1.join)(outputPath, asset);
                    assets[asset] = { source: () => (0, fs_1.readFileSync)(filePath, 'utf8') };
                }
            }
            return assets;
        };
        this.shouldRun = (compilation) => {
            if (this.options.ignoreErrors === false) {
                return compilation.errors.length === 0;
            }
            return true;
        };
        this.options = { ...this.defaults, ...options };
        (0, schema_utils_1.validate)(schema_1.default, this.options, { name: NAME });
        this.generator = new Generator_1.default(this.options);
    }
}
SpritesConstantsGeneratorPlugin.loader = `${DIST}/loader`;
SpritesConstantsGeneratorPlugin.runtimeGenerator = `${DIST}/runtimeGenerator`;
exports.default = SpritesConstantsGeneratorPlugin;
//# sourceMappingURL=index.js.map