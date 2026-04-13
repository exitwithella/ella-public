import * as migration_20260413_051531 from './20260413_051531';

export const migrations = [
  {
    up: migration_20260413_051531.up,
    down: migration_20260413_051531.down,
    name: '20260413_051531'
  },
];
