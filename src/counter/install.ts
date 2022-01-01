import { ipcMain } from 'electron';
import { worker } from './counter.worker.interface';

export default function installCounter() {
  ipcMain.on('counter-inc', async (event) => {
    const counterWorker = await worker;
    const res = await counterWorker.increment();
    console.log(`main received counter inc. new value: ${res}`);
    event.reply('counter-changed', res);
  });

  ipcMain.on('counter-dec', async (event) => {
    const counterWorker = await worker;
    const res = await counterWorker.decrement();
    console.log(`main received counter dec. new value: ${res}`);
    event.reply('counter-changed', res);
  });
}
