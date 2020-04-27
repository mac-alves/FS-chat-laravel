import styled from 'styled-components';

export const Container = styled.header`
    background-color: #4A494B;
    height: 70px;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    color: #EF2D56;

    .iconUser {
        display: flex;
        justify-content: flex-start;

        img {
            width: 50px;
            height: 50px;
        }
    }

    .iconsFuncs{
        display: flex;
        justify-content: flex-start;
        margin-left: auto;
        align-items: center;
        cursor: pointer;
    }
`;
