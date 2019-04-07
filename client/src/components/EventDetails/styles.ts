import Styled from 'styled-components';

export const Container = Styled.div`
    .img-container {
        height: 400px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .description {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        span {
            font-size: 14px;
            margin: 0 8px;
        }
    }
    .ticket-container {
        border: 1px solid #eee;
        .ticket-list {
            display: flex;
            padding: 8px;
            justify-content: space-between;
            align-items: center;
        }
    }
`;
