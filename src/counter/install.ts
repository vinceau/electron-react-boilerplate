import { worker } from './counter.worker.interface';
import {
  ipc_counterUpdated,
  ipc_decrementCounter,
  ipc_incrementCounter,
} from './endpoints';

export default function installCounter() {
  ipc_incrementCounter.main!.handle(async () => {
    const counterWorker = await worker;
    const res = await counterWorker.increment();
    console.log(`main received counter inc. new value: ${res}`);
    ipc_counterUpdated.main!.trigger({ value: res });
    return { success: true };
  });

  ipc_decrementCounter.main!.handle(async () => {
    const counterWorker = await worker;
    const res = await counterWorker.decrement();
    console.log(`main received counter dec. new value: ${res}`);
    ipc_counterUpdated.main!.trigger({ value: res });
    return { success: true };
  });
}
