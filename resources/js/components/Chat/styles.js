import styled from 'styled-components';

export const Container = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

    .imgChat{
        opacity: 0.2;
        width: 70%;
        height: 70%;
        position: absolute;
        top: 15%;
    }

    main {
        padding: 30px 30px 0px 30px;
        overflow-y: auto;
        width: 100%;
        margin-top: auto;
        z-index: 999;
    }

    /* configurando scroll */
    main::-webkit-scrollbar {
        width:10px;
        background:#6E6D6F;
    }

    main::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
    }

    main::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:#4A494B;
    }

    .msgDiv {
        width: 100%;
        display: flex;
        margin-bottom: 7px;
        padding-left: 5%;
        padding-right: 5%;
        display: flex;
        color: #363537;

        .msg {
            background-color: #FFFFFF;
            border-radius: 10px;
            padding: 6px 10px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            max-width: 65%;
            position: relative;

            &>i {
                margin-left: 10px;
                font-size: 12px;
                position: relative;
                top: 7px;
                left: 2px;
            }

            .deletMsg{
                position: absolute;
                left: -28px;
                padding-top: 6px;
                cursor: pointer;
                top: 0;
                width: 50px;
                height: 100%;

                i {
                    background-color:#ef2d56;
                    width: 22px;
                    height: 22px;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px;
                    display: none;
                    transition: all 0.3s linear;
                }

                i:hover{
                    background-color:#a90d2e;
                }
            }

            .deletMsg.user{
                left: unset;
                right: -27px;
                width: 45px;
                display: flex;
            }
        }

        .msg:hover {
            .deletMsg {
                i{
                    display: flex;
                    animation: fade-in 0.5s;
                }
            }
        }

        .msg:not(:hover) {
            .deletMsg{
                i.did-fade-in{
                    display: flex;
                    animation: fade-out 0.5s;
                }
            }
        }

        .msg:not(.userDiv) {
            .deletMsg{
                display: none;
            }
        }

        .msg .body{
            word-break: break-all;
            line-height: 20px;
            font-size: 15px;
        }
    }

    .user {
        justify-content:  flex-end;

        .msg{
            background-color: #8CD867;
        }
    }
`;
