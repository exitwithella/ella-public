import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260121_015500 from './20260121_015500';
import * as migration_20260223_222400 from './20260223_222400';
import * as migration_20260224_165055 from './20260224_165055';
import * as migration_20260224_184720 from './20260224_184720';
import * as migration_20260224_194246 from './20260224_194246';
import * as migration_20260224_221446 from './20260224_221446';
import * as migration_20260225_152656 from './20260225_152656';

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
    name: '20260223_222400',
  },
  {
    up: migration_20260224_165055.up,
    down: migration_20260224_165055.down,
    name: '20260224_165055',
  },
  {
    up: migration_20260224_184720.up,
    down: migration_20260224_184720.down,
    name: '20260224_184720',
  },
  {
    up: migration_20260224_194246.up,
    down: migration_20260224_194246.down,
    name: '20260224_194246',
  },
  {
    up: migration_20260224_221446.up,
    down: migration_20260224_221446.down,
    name: '20260224_221446',
  },
  {
    up: migration_20260225_152656.up,
    down: migration_20260225_152656.down,
    name: '20260225_152656'
  },
];
