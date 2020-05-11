import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99;
    display: flex;
    justify-content: center;

    section{
        background-color: #2d2c2d;
        width: ${props => props.width || '380px' };
        height: ${props => props.height || 'fit-content' };
        position: relative;
        top: 10%;

        button{
            position: absolute;
            background-color: transparent;
            border: none;
            right: 0;
            top: 6px;
            transition: all 0.3s linear;
        }

        button:focus{
            outline:0;
        }

        button:hover{
            transform: scale(1.2);
        }

        main{
            /* background-color: #565; */
            margin-top: 35px;
            height: calc(100% - 35px);
        }
    }

    @media ${Device.tablet} {
        section{
            width: ${props => props.width || '330px' };
        }
    }
`;
