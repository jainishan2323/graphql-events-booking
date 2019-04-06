import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import {
    GlobalStyles,
} from './global.styles';

ReactDOM.render(
    <>
        <GlobalStyles/>
        <App title='Select Event'/>
    </>,
    document.getElementById('app')
);
