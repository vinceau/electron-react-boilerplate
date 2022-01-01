import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.scss';

const Hello = () => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    return window.electron.ipcRenderer.on('counter-changed', (val: number) => {
      console.log(`received counter changed event from main. value: ${val}`);
      setCounter(val);
    });
  });

  React.useEffect(() => {
    return window.electron.ipcRenderer.on('ipc-example', (arg: any) => {
      console.log(arg);
    });
  });

  const onPingClick = () => window.electron.ipcRenderer.myPing();
  const incrementCounter = () => {
    console.log('inc counter button pressed');
    window.electron.ipcRenderer.incCounter();
  };
  const decrementCounter = () => {
    console.log('dec counter button pressed');
    window.electron.ipcRenderer.decCounter();
  };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Hello world!</h1>
      <div className="Hello">
        <button type="button" onClick={onPingClick}>
          Ping IPC
        </button>
      </div>
      <h1>Counter: {counter}</h1>
      <button type="button" onClick={incrementCounter}>
        inc
      </button>
      <button type="button" onClick={decrementCounter}>
        dec
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
