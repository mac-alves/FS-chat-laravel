import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 50px;
    background-color: #727273;
    right: 10px;
    display: flex;
    flex-direction: column;
    width: 190px;

    & > button {
        width: 100%;
        display: flex;
        border-radius: inherit;
        padding-left: 10px;
        color: #ecebee;
        transition: all 0.3s linear;
    }

    & > button:hover{
        background-color: #6d6b6b;
    }
`;
