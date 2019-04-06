import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import {
    GlobalStyles,
} from './global.styles';

ReactDOM.render(
    <>
        <GlobalStyles/>
        <App title='Working React App'/>
    </>,
    document.getElementById('app')
);
