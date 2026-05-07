import { resolve } from 'path';

import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import { Configuration, WebpackPluginInstance } from 'webpack';

import SpritesConstantsGeneratorPlugin from '../src/SpritesConstantsGeneratorPlugin';

import { OUTPUT_PATH, SPRITES_DIR } from './constants';

const images = 'images';
const sprites = ['icons'];
const test = 'test';

const config: Configuration = {
  mode: 'production',
  entry: {
    index: resolve(__dirname, 'assets', 'index.ts'),
  },
  output: {
    path: OUTPUT_PATH,
    filename: 'index.js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    ...sprites.map(
      sprite =>
        new SVGSpritemapPlugin(
          resolve(__dirname, `assets/${images}/${sprite}/*.svg`),
          {
            output: {
              filename: `${images}/${test}-${sprite}.svg`,
              svgo: false,
            },
            sprite: {
              prefix: `${test}-${sprite}-`,
              generate: {
                use: false,
                view: false,
                title: false,
              },
            },
          },
        ) as unknown as WebpackPluginInstance,
    ),
    new SpritesConstantsGeneratorPlugin({
      namespace: 'App\\Sprites',
      output: SPRITES_DIR,
      replace: sprite => [`${sprite}-`, ''],
      sprites: sprites.map(s => `${images}/${test}-${s}.svg`),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

export default config;
