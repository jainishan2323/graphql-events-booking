import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import EventsList from './EventsList/';

import {
    StyledH3,
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
                <div>
                    <StyledH3>{this.props.title}</StyledH3>
                    <EventsList />
                </div>
            </ApolloProvider>
        )
    }
}