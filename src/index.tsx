import React from 'react'
import ReactDOM from 'react-dom/client';
import { App } from './App';

let root: HTMLElement = document.getElementById('root') as HTMLElement;

const container = ReactDOM.createRoot(root);
container.render(<App />);