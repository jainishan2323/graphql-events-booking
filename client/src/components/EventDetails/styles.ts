import Styled from 'styled-components';

export const Container = Styled.div`
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    .img-container {
        height: 400px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
`;

export const BookingContainer = Styled.div`
    padding: 8px;
    .breadcrumbs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        .title {
            display: flex;
            h3 {
                padding: 0 8px;
            }
        }
        .link-button {
            background: transparent;
            border: none;
            padding: 4px 6px;
            border-radius: 50%;
            &:hover {
                background: #ddd;
            }
            i {
                font-size: 26px;
                font-weight: bold;
            }
        }
    }
`;

export const DescriptionContainer = Styled.section`
    padding: 8px;
    .description {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        span {
            font-size: 14px;
            margin: 0 8px;
        }
    }
    .ticket-container {
        border: 1px solid #ddd;
        .ticket-list {
            display: flex;
            padding: 8px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
        }
    }
    .button-container {
        padding: 8px;
        button {
            display: block;
            margin: 0 auto;
        }
    }
`;

export const FormContainer = Styled.div`
    border-bottom: 1px solid #ddd;
    form {
        >div {
            display: flex;
            padding: 8px;
            margin-bottom: 16px;
            >div {
                width: 50%;
            }
        }
        .submit-field {
            input[type="submit"] {
                display: block;
                margin: 0 auto;
                padding: 8px 32px;
                font-size: 14px;
                border-radius: 16px;
                background: #3498db;
                color: #fff;
                &:disabled {
                    opacity: 0.5
                }
            }
        }
        label {
            display: block;
            font-size: 12px;
            font-weight: bold;
        }
        input[type="text"], input[type="email"] {
            border: none;
            border-bottom: 1px solid #ddd;
            width: 85%;
            padding: 4px 0;
            font-size: 14px;
            height: 30px;
            outline: none;
        }
        .ticket-details {
            display: block;
            border-bottom: 1px;
        }
    }
`;
