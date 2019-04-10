import Styled from 'styled-components';

export const CardContainer = Styled.div`
    width: 700px;
    border-radius: 8px;
    margin: 16px auto;
    display: flex;
    background: white; 
    img {
        width: 400px;
        min-width: 400px;
        height: 200px;
        margin: 12px;
        border-radius: 8px;
    }
    article {
        padding: 8px;
    }
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`;

export const Container = Styled.section`
    padding: 16px;
    background: white;
    h2 {
        text-align: center;
    }
`;
