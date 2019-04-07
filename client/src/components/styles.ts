import Styled from 'styled-components';

export const StyledH2 = Styled.h2`
    color: #444;
`;

export const Loader = Styled.div`
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const StyledAppContainer = Styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 8px;
    background: #fff;
`;

export const Card = Styled.div`
    border-radius: 4px;
    padding: 0;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`;

export const LinkStyles = {
    color: '#444',
    textDecoration: 'none'
};
