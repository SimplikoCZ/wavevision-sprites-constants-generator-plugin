import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import webpack from 'webpack';
import { validate } from 'schema-utils';

import Generator from './Generator';
import schema from './schema';
import { Assets, Options } from './types';

const DIST = resolve(__dirname, '..', '..', 'dist');
const NAME = 'SpritesConstantsGeneratorPlugin';

class SpritesConstantsGeneratorPlugin {
  public constructor(options: Options) {
    this.options = { ...this.defaults, ...options };
    validate(schema, this.options, { name: NAME });
    this.generator = new Generator(this.options);
  }

  public static loader = `${DIST}/loader`;

  public static runtimeGenerator = `${DIST}/runtimeGenerator`;

  private readonly defaults: Partial<Options> = {
    ignoreErrors: false,
    useStaticClass: true,
    useStrictTypes: true,
  };

  private readonly generator: Generator;

  private readonly options: Options;

  private logger!: ReturnType<webpack.Compilation['getLogger']>;

  public readonly apply = (compiler: webpack.Compiler): void => {
    compiler.hooks.thisCompilation.tap(NAME, compilation => {
      this.logger = compilation.getLogger(NAME);
    });
    compiler.hooks.afterEmit.tapAsync(NAME, this.run);
  };

  private readonly run = (
    compilation: webpack.Compilation,
    callback: () => void,
  ): void => {
    if (this.shouldRun(compilation)) {
      try {
        const messages = this.generator.run(this.getAssets(compilation));
        this.logger.group(NAME);
        messages.forEach(m => this.logger.info(m));
        this.logger.groupEnd();
      } catch (e) {
        const err = new Error(`${NAME}: ${(e as Error).message}`);
        compilation.errors.push(err as webpack.WebpackError);
      }
    }
    callback();
  };

  private readonly getAssets = (
    compilation: webpack.Compilation,
  ): Assets => {
    const assets: Assets = {};
    const outputPath = compilation.outputOptions.path!;
    for (const asset in compilation.assets) {
      if (this.options.sprites.includes(asset)) {
        const filePath = join(outputPath, asset);
        assets[asset] = { source: () => readFileSync(filePath, 'utf8') };
      }
    }
    return assets;
  };

  private readonly shouldRun = (
    compilation: webpack.Compilation,
  ): boolean => {
    if (this.options.ignoreErrors === false) {
      return compilation.errors.length === 0;
    }
    return true;
  };
}

export default SpritesConstantsGeneratorPlugin;
