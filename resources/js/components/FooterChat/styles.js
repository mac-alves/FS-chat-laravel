import styled from 'styled-components';

export const Container = styled.footer`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 20px;
    background-color: #4A494B;

    .fomMsg {
        height: 100%;
        width: 100%;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* background-color: #234; */

        button {
            background-color: transparent;
            border: 0;
            margin-left: 10px;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s linear;
            border-radius: 25px;
            color: #EF2D56;
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
`;
