import { Options } from './types';
declare const makeFile: (className: string, constants: Array<{
    name: string;
    value: string;
}>, options: Options) => string;
export default makeFile;
