import styled from 'styled-components';

export const Container = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    main {
        padding: 30px 30px 20px;
        overflow-y: scroll;
        height: 500px;
        /* background-color: #566; */
        width: 100%;
        flex: 1 1 auto;
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

            i {
                margin-left: 10px;
                font-size: 12px;
                position: relative;
                top: 7px;
                left: 2px;
            }
        }
    }

    .user {
        justify-content:  flex-end;

        .msg{
            background-color: #8CD867;
        }
    }
`;
