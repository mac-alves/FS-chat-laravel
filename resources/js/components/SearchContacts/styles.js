import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.div`
    padding: 10px 10px 5px 10px;
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    transition: height 0.5s ease;

    & > div {
        width: 360px;
    }

    .searchCont{
        padding-bottom: 10px;
        position: relative;
        width: 100%;

        span{
            position: absolute;
            left: 9px;
            top: 7px;
        }
    }

    .listContacts {
        overflow-y: auto;
        max-height: 400px;
        width: 100%;

        & > div {
            display: flex;
            padding: 10px 10px 0 10px;
            border-top: 1px solid #414244;
            border-bottom: 1px solid #292929;
            position: relative;
            height: 68px;

            .info{
                margin-left: 10px;
                color:#afa9b5;

                .name {
                    font-size: 1.5em;
                    p{
                        line-height: 27px;
                        font-weight: bold;
                    }
                }
            }

            .add{
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                display: flex;
                align-items: center;
                margin-right: 10px;

                i {
                    transition: all 0.3s linear;
                    cursor: pointer;
                }

                i:hover{
                    transform: scale(1.2)
                }
            }
        }
    }

    /* configurando scroll */
    .listContacts::-webkit-scrollbar {
        width:3px;
        background:#6E6D6F;
    }

    .listContacts::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
    }

    .listContacts::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:#4A494B;
    }

    /* lista de contatos */
    .listcont-enter {
        position: absolute;
        transform: translateX(-110%);
    }

    .listcont-enter-active {
        transform: translateX(0%);
        transition: all 0.5s ease;
    }

    .listcont-exit {
        position: absolute;
    }

    .listcont-exit-active {
        transform: translateX(-110%);
        transition: all 0.5s ease;
    }
    /* --------------- */

    /* pagina com as infos  */
    .pageuser-enter {
        transform: translateX(110%);
    }

    .pageuser-enter-active {
        transform: translateX(0%);
        transition: all 0.5s ease;
    }

    .pageuser-exit {
        /* position: absolute; */
    }

    .pageuser-exit-active {
        transform: translateX(110%);
        transition: all 0.5s ease;
    }
    /* --------------- */

    @media ${Device.tablet} {
        & > div {
            width: 320px;
        }
    }
`;

export const Input = styled(DebounceInput)`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: solid 1px #6d6d6d;
    font-size: 17px;
    padding: 8px 10px 8px 36px;
    color: #fff;
    background-color: #6E6D6F;
    transition: all 0.3s linear;


    /* retira a borda azul qundo clica nele (da pra suar em button tambem) */
    &:focus{
        outline: thin dotted;
        outline: 0px auto -webkit-focus-ring-color;
        outline-offset: 0px;
    }
`;
