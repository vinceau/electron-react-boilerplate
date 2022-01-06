import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon, { ReactComponent as LogoIcon } from '../../assets/icon.svg';
import './App.global.scss';

function Hello() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    return window.electron.counter.onCounterChange((val: number) => {
      console.log(`received counter changed event from main. value: ${val}`);
      setCounter(val as number);
    });
  });

  React.useEffect(() => {
    return window.electron.ipcRenderer.on('ipc-example', (arg: any) => {
      console.log(arg);
    });
  });

  const onPingClick = () => window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
  const incrementCounter = () => {
    console.log('inc counter button pressed');
    window.electron.counter.incrementCounter();
  };
  const decrementCounter = () => {
    console.log('dec counter button pressed');
    window.electron.counter.decrementCounter();
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
        <LogoIcon />
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
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
