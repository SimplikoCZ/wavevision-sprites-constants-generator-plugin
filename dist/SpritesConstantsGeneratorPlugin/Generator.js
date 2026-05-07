"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const cheerio_1 = require("cheerio");
const makeFile_1 = __importDefault(require("./makeFile"));
const utils_1 = require("./utils");
class Generator {
    constructor(options) {
        this.run = (sprites) => {
            const messages = [];
            messages.push((0, makeFile_1.default)('Sprites', this.options.sprites.map(s => {
                const value = this.getSpriteName(s);
                return { name: this.makeConstantName(value), value };
            }), this.options));
            for (const sprite of this.options.sprites) {
                messages.push(this.makeSpriteFile(sprite, sprites[sprite].source()));
            }
            return messages;
        };
        this.getSpriteName = (sprite) => (0, path_1.basename)(sprite, '.svg');
        this.handleReplace = (sprite, value) => {
            if (typeof this.options.replace === 'function') {
                const [search, replace] = this.options.replace(sprite);
                return value.replace(search, replace);
            }
            return value;
        };
        this.makeConstantName = (value) => value.replace(/-/g, '_').toUpperCase();
        this.makeSpriteFile = (sprite, source) => {
            const $content = (0, cheerio_1.load)(source);
            const baseName = this.getSpriteName(sprite);
            const className = (0, utils_1.filterClassName)(baseName);
            const constants = [];
            $content('svg symbol').each((index, element) => {
                const value = $content(element).attr('id');
                if (!value) {
                    throw new Error('SVG symbol ID is missing.');
                }
                constants.push({
                    name: this.makeConstantName(this.handleReplace(baseName, value)),
                    value,
                });
            });
            return (0, makeFile_1.default)(className, constants, this.options);
        };
        this.options = options;
    }
}
exports.default = Generator;
//# sourceMappingURL=Generator.js.map