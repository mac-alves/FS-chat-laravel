import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.div`
    position: absolute;
    top: 50px;
    background-color: #727273;
    right: 10px;
    display: flex;
    flex-direction: column;
    width: 190px;
    z-index: 20;

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

    @media ${Device.tablet} {
        & {
            top: 40px;
        }
    }
`;
