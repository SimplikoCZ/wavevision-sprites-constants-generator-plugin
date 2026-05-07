import { rmSync } from 'fs';

import assert from './index/assert';
import compile from './index/compile';
import { OUTPUT_PATH, SPRITES_DIR } from './constants';

jest.setTimeout(10000);

describe('SpritesConstantsGeneratorPlugin', () => {
  beforeAll(() => {
    [OUTPUT_PATH, SPRITES_DIR].forEach(path =>
      rmSync(path, { recursive: true, force: true }),
    );
  });
  compile();
  assert();
});
