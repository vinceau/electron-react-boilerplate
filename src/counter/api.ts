import { ipcRenderer, IpcRendererEvent } from 'electron';

type IpcEventListener = (event: IpcRendererEvent, ...args: any[]) => void;

const validChannels = ['counter-changed'];

function addChannelSubscription(channel: string, func: any) {
  if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    const subscription: IpcEventListener = (_event, ...args) => func(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  }
  return () => {};
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
