import type { ElectronHandler } from "../../src/main/preload";

const electronHandler: ElectronHandler = {
  counter: {
    onCounterChange() {
      return () => undefined;
    },
    incrementCounter() {},
    decrementCounter() {},
  },
  ipcRenderer: {
    sendMessage: () => {},
    on: () => {
      return () => undefined;
    },
    once: () => {
      return () => undefined;
    },
  },
};

(global as any).electron = electronHandler;
