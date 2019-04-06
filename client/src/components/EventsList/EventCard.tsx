import React from 'react';

import { CardContainer } from './styles';
import { Card } from '../styles';

const EventsCard : React.SFC<any> = ({
    banner_url,
    name,
    description,
}) => (
    <CardContainer>
        <img src={banner_url} alt="bg image"/>
        <article>
            <h3>{name}</h3>
            <p>
                {description}
            </p>
        </article>
    </CardContainer>
);

export default EventsCard;
