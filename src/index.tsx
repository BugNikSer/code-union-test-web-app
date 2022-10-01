import * as React from 'react'
import ReactDOM from 'react-dom/client';

const App = () => (<div>
  <h1>Hello, world!</h1>
</div>)

let root: HTMLElement = document.getElementById('root') as HTMLElement;

const container = ReactDOM.createRoot(root);
container.render(<App />);