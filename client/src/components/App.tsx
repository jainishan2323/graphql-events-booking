import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import EventsList from './EventsList/';

import {
    StyledAppContainer,
    StyledH2,
} from './styles';

interface IAppProps {
    title: string;
}

const client = new ApolloClient({
    uri: 'https://server.jainishan2323.now.sh/graphql'
})
export default class App extends React.PureComponent<IAppProps> {
    public render() {
        return (
            <ApolloProvider client={client}>
                <StyledAppContainer>
                    <StyledH2>{this.props.title}</StyledH2>
                    <EventsList />
                </StyledAppContainer>
            </ApolloProvider>
        )
    }
}