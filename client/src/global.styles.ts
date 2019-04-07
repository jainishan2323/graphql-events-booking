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

    .tertiary {
        color: #aaa;
    }

    h1,h2,h3 {
        margin: 12px 0;
    }
    h4,h5,p {
        margin: 8px 0;
    }
`;
