import React from 'react';
import { Link } from 'react-router-dom';

import { CardContainer } from './styles';
import { LinkStyles, Button } from '../styles';

const EventsCard : React.SFC<any> = ({
    banner_url,
    name,
    description,
    url
}) => (
    <CardContainer>
        <img src={banner_url} alt="bg image"/>
        <article>
            <h3>{name}</h3>
            <p>
                {description}
            </p>
            
                <Link to={`events${url}`} style={LinkStyles}>
                    <Button>
                        Book Event
                    </Button>
                </Link>
        </article>
    </CardContainer>
);

export default EventsCard;
