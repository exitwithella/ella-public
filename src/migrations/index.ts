import * as migration_20260413_051531 from './20260413_051531';
import * as migration_20260415_212223 from './20260415_212223';
import * as migration_20260416_044650 from './20260416_044650';
import * as migration_20260416_161514 from './20260416_161514';
import * as migration_20260416_165650 from './20260416_165650';
import * as migration_20260416_173708 from './20260416_173708';

export const migrations = [
  {
    up: migration_20260413_051531.up,
    down: migration_20260413_051531.down,
    name: '20260413_051531',
  },
  {
    up: migration_20260415_212223.up,
    down: migration_20260415_212223.down,
    name: '20260415_212223',
  },
  {
    up: migration_20260416_044650.up,
    down: migration_20260416_044650.down,
    name: '20260416_044650',
  },
  {
    up: migration_20260416_161514.up,
    down: migration_20260416_161514.down,
    name: '20260416_161514',
  },
  {
    up: migration_20260416_165650.up,
    down: migration_20260416_165650.down,
    name: '20260416_165650',
  },
  {
    up: migration_20260416_173708.up,
    down: migration_20260416_173708.down,
    name: '20260416_173708'
  },
];
