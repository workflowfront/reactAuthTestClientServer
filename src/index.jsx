import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import { store } from './emulServer';
import { App } from './App';

// setup fake backend
import { emulBackend } from './emulServer';
emulBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);