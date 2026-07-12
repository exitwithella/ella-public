import * as migration_20260413_051531 from './20260413_051531';
import * as migration_20260415_212223 from './20260415_212223';
import * as migration_20260416_044650 from './20260416_044650';
import * as migration_20260416_161514 from './20260416_161514';
import * as migration_20260416_165650 from './20260416_165650';
import * as migration_20260416_173708 from './20260416_173708';
import * as migration_20260611_191554 from './20260611_191554';
import * as migration_20260711_151324_add_credits_body from './20260711_151324_add_credits_body';
import * as migration_20260712_180006_mkt_205_dilemma_subtitles_closer from './20260712_180006_mkt_205_dilemma_subtitles_closer';
import * as migration_20260712_180023_mkt_223_dilemma_typed_arrays from './20260712_180023_mkt_223_dilemma_typed_arrays';

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
    name: '20260416_173708',
  },
  {
    up: migration_20260611_191554.up,
    down: migration_20260611_191554.down,
    name: '20260611_191554',
  },
  {
    up: migration_20260711_151324_add_credits_body.up,
    down: migration_20260711_151324_add_credits_body.down,
    name: '20260711_151324_add_credits_body',
  },
  {
    up: migration_20260712_180006_mkt_205_dilemma_subtitles_closer.up,
    down: migration_20260712_180006_mkt_205_dilemma_subtitles_closer.down,
    name: '20260712_180006_mkt_205_dilemma_subtitles_closer',
  },
  {
    up: migration_20260712_180023_mkt_223_dilemma_typed_arrays.up,
    down: migration_20260712_180023_mkt_223_dilemma_typed_arrays.down,
    name: '20260712_180023_mkt_223_dilemma_typed_arrays'
  },
];
