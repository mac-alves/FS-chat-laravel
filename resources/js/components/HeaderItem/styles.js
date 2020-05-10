import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: auto;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s linear;
    position: relative;

    button {
        background-color: transparent;
        border: none;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        transition: all 0.2s linear;
    }

    button:focus{
        outline:0;
    }

    button.open{
        background-color: #575758;
    }

    .dropdown-enter {
        opacity: 0;
        transform: scale(0.5);
    }

    .dropdown-enter-active {
        transition: opacity 300ms, transform 300ms;
        transform-origin: right top;
        transform: scale(1);
        opacity: 1;
    }

    .dropdown-exit {
        opacity: 1;
    }

    .dropdown-exit-active {
        transition: opacity 300ms, transform 300ms;
        transform-origin: right top;
        transform: scale(0.5);
        opacity: 0;
    }
`;
