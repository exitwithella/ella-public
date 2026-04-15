import * as migration_20260413_051531 from './20260413_051531';
import * as migration_20260415_212223 from './20260415_212223';

export const migrations = [
  {
    up: migration_20260413_051531.up,
    down: migration_20260413_051531.down,
    name: '20260413_051531',
  },
  {
    up: migration_20260415_212223.up,
    down: migration_20260415_212223.down,
    name: '20260415_212223'
  },
];
