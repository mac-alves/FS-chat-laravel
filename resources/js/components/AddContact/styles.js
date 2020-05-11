import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.div`
    width: 100%;
    height: 280px;

    .return{
        position: absolute;

        i {
            display: flex;
            transition: all 0.3s linear;
            cursor: pointer;
        }

        i:hover{
            transform: scale(1.2);
        }
    }

    .page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 10px;

        .infoUser{
            margin-bottom: 10px;

            img{
                width: 150px;
                height: 150px;
            }

            h3, p{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
            }
        }

        .form-newCont{
            display: flex;
            width: 100%;
            padding-left: 40px;

            button {
                background-color: transparent;
                border: 0;
                margin-left: 10px;
                width: initial;
                height: initial;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all 0.2s linear;
                border-radius: 25px;
                color: #EF2D56;
                position: initial;
            }

            button:hover {
                background-color: #413e44;
            }

            button:focus{
                outline: 0;
            }

            button:disabled{
                background-color: transparent;
            }
        }

    }

    @media ${Device.tablet} {
        .form-newCont{
            button:hover {
                background-color: transparent;
            }
        }
    }
`;
