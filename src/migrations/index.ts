import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260121_015500 from './20260121_015500';
import * as migration_20260223_222400 from './20260223_222400';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260121_015500.up,
    down: migration_20260121_015500.down,
    name: '20260121_015500',
  },
  {
    up: migration_20260223_222400.up,
    down: migration_20260223_222400.down,
    name: '20260223_222400'
  },
];
