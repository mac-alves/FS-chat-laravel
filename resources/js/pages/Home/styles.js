import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.div`
    background-color: #363537;
    height: calc(100% - 38px);
    top: 19px;
    display: flex;
    overflow: hidden;
    position: relative;
    -webkit-box-shadow: 0px 1px 3px 0px rgba(99,99,99,1);
    -moz-box-shadow: 0px 1px 3px 0px rgba(99,99,99,1);
    box-shadow: 0px 1px 3px 0px rgba(99,99,99,1);

    /* lista de contatos */
    .homecont-enter {
        position: absolute;
        transform: translateX(-110%);
    }

    .homecont-enter-active {
        transform: translateX(0%);
        transition: all 0.5s ease;
    }

    .homecont-exit {
        position: absolute;
    }

    .homecont-exit-active {
        transform: translateX(-110%);
        transition: all 0.5s ease;
    }
    /* --------------- */

    /* pagina com as infos  */
    .homechat-enter {
        transform: translateX(110%);
    }

    .homechat-enter-active {
        transform: translateX(0%);
        transition: all 0.5s ease;
    }

    .homechat-exit {
        /* position: absolute; */
    }

    .homechat-exit-active {
        transform: translateX(110%);
        transition: all 0.5s ease;
    }
    /* --------------- */

    @media ${Device.mobileL} {
        & {
            height: calc(100% - 13px);
            top: 5px;
        }

        .userContact {

            img {
                width: 35px;
                height: 35px;
            }
        }
    }

`;
