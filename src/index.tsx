import * as React from 'react'
import ReactDOM from 'react-dom/client';

const App = () => (<div>
  <h1>Hello, world!</h1>
</div>)

let root: HTMLElement | null = document.getElementById('root');

if (root === null) {
    root = document.createElement('div');
    root.id = 'root';
}

const container = ReactDOM.createRoot(root);
container.render(<App />);