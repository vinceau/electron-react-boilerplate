import { ipcRenderer, IpcRendererEvent } from 'electron';

type Channels = 'counter-changed';

function addChannelSubscription(channel: Channels, func: any) {
  const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
    func(...args);
  ipcRenderer.on(channel, subscription);

  return () => {
    ipcRenderer.removeListener(channel, subscription);
  };
}

export default {
  onCounterChange(handle: (val: number) => void) {
    return addChannelSubscription('counter-changed', handle);
  },
  incrementCounter() {
    console.log("sending 'counter-inc' message to main");
    ipcRenderer.send('counter-inc');
  },
  decrementCounter() {
    console.log("sending 'counter-dec' message to main");
    ipcRenderer.send('counter-dec');
  },
};
