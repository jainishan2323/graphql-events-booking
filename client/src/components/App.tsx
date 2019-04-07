import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import EventsList from './EventsList/';
import EventDetails from './EventDetails';

import {
    StyledAppContainer,
    StyledH2,
} from './styles';

interface IAppProps {
    title: string;
}


export default class App extends React.PureComponent<IAppProps> {
    public render() {
        return (
            <StyledAppContainer>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Redirect to='/events' />}
                        />
                        <Route
                            exact
                            path='/events'
                            component={EventsList}
                        />
                        <Route
                            exact
                            path='/events/:event'
                            component={EventDetails}
                        />
                    </Switch>
                </Router>
            </StyledAppContainer>
        )
    }
}