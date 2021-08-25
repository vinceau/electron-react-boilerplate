import { app } from 'electron';
import electronLog from 'electron-log';
import { spawn, Thread, Worker } from 'threads';

import { Methods as WorkerMethods, WorkerSpec } from './replay_indexer_worker';

const log = electronLog.scope('replay_indexer');

// eslint-disable-next-line import/prefer-default-export
export const worker: Promise<Thread & WorkerMethods> = new Promise(
  (resolve, reject) => {
    log.debug('Spawning worker');

    spawn<WorkerSpec>(new Worker('./replay_indexer_worker'), {
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

        // Thread.events(worker).subscribe((evt) => {
        //   log.debug("replayBrowser: Worker event:", evt);
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
