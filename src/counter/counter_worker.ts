// NOTE: This module cannot use electron-log, since it for some reason
// fails to obtain the paths required for file transport to work
// when in Node worker context.

import { ModuleMethods } from 'threads/dist/types/master';
import { expose } from 'threads/worker';

let currentCount = 0;

export interface Methods {
  destroyWorker: () => Promise<void>;
  getCount: () => Promise<number>;
  increment: () => Promise<number>;
  decrement: () => Promise<number>;
}

export type WorkerSpec = ModuleMethods & Methods;

const methods: WorkerSpec = {
  async destroyWorker(): Promise<void> {
    // Clean up worker
  },
  async getCount() {
    console.log(`get count: ${currentCount}`);
    return currentCount;
  },
  async increment() {
    currentCount += 1;
    console.log(`incremented count: ${currentCount}`);
    return currentCount;
  },
  async decrement() {
    currentCount -= 1;
    console.log(`decremented count: ${currentCount}`);
    return currentCount;
  },
};

expose(methods);
