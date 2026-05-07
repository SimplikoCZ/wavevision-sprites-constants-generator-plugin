import { Assets, Options } from './types';
declare class Generator {
    constructor(options: Options);
    private readonly options;
    readonly run: (sprites: Assets) => string[];
    private readonly getSpriteName;
    private readonly handleReplace;
    private readonly makeConstantName;
    private readonly makeSpriteFile;
}
export default Generator;
