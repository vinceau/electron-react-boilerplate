import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

type IpcEventListener = (event: IpcRendererEvent, ...args: any[]) => void;

const validChannels = ['ipc-example', 'counter-changed'];

const api = {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel: string, func: any) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        const subscription: IpcEventListener = (_event, ...args) =>
          func(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
          ipcRenderer.removeListener(channel, subscription);
        };
      }
      return () => {};
    },
    once(channel: string, func: any) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
    incCounter() {
      console.log("sending 'counter-inc' message to main");
      ipcRenderer.send('counter-inc');
    },
    decCounter() {
      console.log("sending 'counter-dec' message to main");
      ipcRenderer.send('counter-dec');
    },
  },
};

contextBridge.exposeInMainWorld('electron', api);

export type API = typeof api;
