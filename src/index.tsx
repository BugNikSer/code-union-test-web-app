import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

const container = ReactDOM.createRoot(root);
container.render(<App />);
