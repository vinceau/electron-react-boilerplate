import {
  ipc_counterUpdated,
  ipc_decrementCounter,
  ipc_incrementCounter,
} from './endpoints';

export default {
  onCounterChange(handle: (val: number) => void) {
    const { destroy } = ipc_counterUpdated.renderer!.handle(
      async ({ value }) => {
        handle(value);
      }
    );
    return destroy;
  },
  incrementCounter() {
    console.log("sending 'counter-inc' message to main");
    ipc_incrementCounter.renderer!.trigger({});
  },
  decrementCounter() {
    console.log("sending 'counter-dec' message to main");
    ipc_decrementCounter.renderer!.trigger({});
  },
};
