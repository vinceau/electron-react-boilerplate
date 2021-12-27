import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.scss';

function Hello() {
  React.useEffect(() => {
    window.electron.ipcRenderer.on('ipc-example', (arg: any) => {
      console.log(arg);
    });
  });

  const onPingClick = () => window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>Hello world!</h1>
      <div className="Hello">
        <button type="button" onClick={onPingClick}>
          Ping IPC
        </button>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
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
