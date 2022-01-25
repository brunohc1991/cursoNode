import { chalk } from 'chalk';
import { difference } from 'lodash';

const a = [1,2,3,4,5];

const b = [1,3,5,7,9];

const _dif = difference(a,b);

console.log(chalk.red.bold(_dif));