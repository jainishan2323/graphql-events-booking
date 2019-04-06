import Styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Raleway', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        min-width: 100%;
        background-color: #eee;
        color: #444;
    }
`;
