import React from "react";
import type { FC } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Authenticaction } from "./Authentication/Authentication";

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Authenticaction />
      </ThemeProvider>
    </Provider>
  );
};
