import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.header`
    background-color: #4A494B;
    height: 70px;
    width: 100%;
    padding: 10px 13px;
    display: flex;
    color: #EF2D56;

    .userContact {
        display: flex;
        justify-content: flex-start;
        /* background-color: #678; */

        img {
            width: 50px;
            height: 50px;
        }

        .info{
            /* background-color: #aaa; */
            padding: 2px;
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            color: #f7ebee;

            p {
                font-size: 20px;
                font-weight: bold;
                transition: all 0.3s linear;
            }

            i {
                line-height: 16px;
                transition: all 0.3s linear;
            }
        }

        svg, img {
            cursor: pointer;
            transition: all 0.3s linear;
        }
        svg:hover, img:hover {
            transform: scale(1.1) rotate(-15deg);
        }

    }

    @media ${Device.mobileL} {
        & {
            padding: 10px 10px;
            height: 50px;
        }

        .userContact {

            img {
                width: 35px;
                height: 35px;
            }
        }
    }
`;
