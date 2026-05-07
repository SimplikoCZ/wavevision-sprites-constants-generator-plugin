import fs from 'fs';
import path from 'path';

import { compile } from 'handlebars';

import { Options } from './types';

const declare = '<?php declare (strict_types = 1);';
const template = compile(
  `{{#if useStrictTypes}}
{{{declare}}}

{{/if}}
namespace {{namespace}};

{{#if useStaticClass}}use Nette\\StaticClass;{{/if}}

class {{className}}
{

\t{{#if useStaticClass}}use StaticClass;{{/if}}

{{#each constants}}
\tpublic const {{this.name}} = '{{this.value}}';

{{/each}}
}
`,
);

const makeFile = (
  className: string,
  constants: Array<{ name: string; value: string }>,
  options: Options,
): string => {
  const { namespace, output, useStaticClass, useStrictTypes } = options;
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
  fs.writeFileSync(
    path.resolve(output, `${className}.php`),
    template({
      className,
      constants,
      declare,
      namespace,
      useStaticClass,
      useStrictTypes,
    }),
    'utf8',
  );
  return `${namespace}\\${className} created`;
};

export default makeFile;
