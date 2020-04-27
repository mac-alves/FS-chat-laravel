import styled from 'styled-components';

export const Container = styled.footer`
    width: 100%;
    height: 70px;
    display: flex;/*
    justify-content: space-between;
    align-items: center; */
    padding: 7px 20px;
    background-color: #4A494B;

    .enter {
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s linear;
        border-radius: 25px;
        color: #EF2D56;
    }

    .enter:hover{
        background-color: #464548;
    }

    .write {
        flex: 1 1 auto;
    }

    form {
        height: 100%;
        padding: 5px;
    }

    input{
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border: solid 1px #6d6d6d;
        line-height: 20px;
        font-size: 15px;
        padding: 10px 10px 10px 10px;
        color: #fff;
        background-color: #6E6D6F;
    }



    /* retira a borda azul qundo clica nele (da pra suar em button tambem) */
    input:focus{
        outline: thin dotted;
        outline: 0px auto -webkit-focus-ring-color;
        outline-offset: 0px;
    }
`;
