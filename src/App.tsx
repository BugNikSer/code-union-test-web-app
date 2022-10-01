import React from 'react';
import type { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const App: FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div>hi</div>
            </ThemeProvider>
        </Provider>
    );
};
