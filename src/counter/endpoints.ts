/* eslint-disable @typescript-eslint/naming-convention */

import type { EmptyPayload, SuccessPayload } from '../ipc';
import { _, makeEndpoint } from '../ipc';

export const ipc_incrementCounter = makeEndpoint.main(
  'incrementCounter',
  <EmptyPayload>_,
  <SuccessPayload>_
);

export const ipc_decrementCounter = makeEndpoint.main(
  'decrementCounter',
  <EmptyPayload>_,
  <SuccessPayload>_
);

// Events

export const ipc_counterUpdated = makeEndpoint.renderer(
  'counter_counterUpdated',
  <{ value: number }>_
);
