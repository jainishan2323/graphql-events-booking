import React from 'react';
import { Link } from 'react-router-dom';

import { CardContainer } from './styles';
import { LinkStyles } from '../styles';

const EventsCard : React.SFC<any> = ({
    banner_url,
    name,
    description,
    url
}) => (
    <Link to={`events${url}`} style={LinkStyles}>
        <CardContainer>
            <img src={banner_url} alt="bg image"/>
            <article>
                <h3>{name}</h3>
                <p>
                    {description}
                </p>
            </article>
        </CardContainer>
    </Link>
);

export default EventsCard;
