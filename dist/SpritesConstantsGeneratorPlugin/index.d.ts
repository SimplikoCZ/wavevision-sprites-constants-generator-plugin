import webpack from 'webpack';
import { Options } from './types';
declare class SpritesConstantsGeneratorPlugin {
    constructor(options: Options);
    static loader: string;
    static runtimeGenerator: string;
    private readonly defaults;
    private readonly generator;
    private readonly options;
    private logger;
    readonly apply: (compiler: webpack.Compiler) => void;
    private readonly run;
    private readonly getAssets;
    private readonly shouldRun;
}
export default SpritesConstantsGeneratorPlugin;
