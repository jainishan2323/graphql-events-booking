import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

import App from './components/App';
import {
    GlobalStyles,
} from './global.styles';

const cloudUri = 'https://server.jainishan2323.now.sh/graphql';
const local = 'http://localhost:4000/graphql';
const client = new ApolloClient({
    uri: local,
})

ReactDOM.render(
    <>
        <GlobalStyles/>
        <ApolloProvider client={client}>
            <App title='Select Event'/>
        </ApolloProvider>
    </>,
    document.getElementById('app')
);
