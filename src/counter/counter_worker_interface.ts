import { app } from 'electron';
import electronLog from 'electron-log';
import { spawn, Thread, Worker } from 'threads';

import type { Methods as WorkerMethods, WorkerSpec } from './counter_worker';

const log = electronLog.scope('counter');

// eslint-disable-next-line import/prefer-default-export
export const worker: Promise<Thread & WorkerMethods> = new Promise(
  (resolve, reject) => {
    log.debug('Spawning worker');

    spawn<WorkerSpec>(new Worker('./counter_worker'), {
      timeout: 30000,
    })
      // eslint-disable-next-line promise/always-return
      .then((_worker) => {
        log.debug('Spawning worker: Done');

        async function terminateWorker() {
          log.debug('Terminating worker');
          try {
            await _worker.destroyWorker();
          } finally {
            await Thread.terminate(_worker);
          }
        }

        app.on('quit', terminateWorker);

        // Thread.events(_worker).subscribe((evt) => {
        //   log.debug("Worker event:", evt);
        //   // TODO: Respawn on worker exit?
        // });

        resolve(_worker);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  }
);
