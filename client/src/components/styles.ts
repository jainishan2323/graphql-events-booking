import Styled from 'styled-components';

export const StyledH3 = Styled.h3`
    color: grey;
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
    max-width: 1024px;
    margin: 0 auto;
    padding: 8px;
    background: #fff;
`;
