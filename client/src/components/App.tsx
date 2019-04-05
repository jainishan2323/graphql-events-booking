import React from 'react';

import {
    StyledH3,
} from './styles';

interface IAppProps {
    title: string;
}

export default class App extends React.PureComponent<IAppProps> {
    public render() {
        return (
            <div>
                <StyledH3>{this.props.title}</StyledH3>
            </div>
        )
    }
}