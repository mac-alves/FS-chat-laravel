import styled from 'styled-components';
import { Device } from '../../config';

export const Container = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: solid 1px #6d6d6d;
    line-height: 20px;
    font-size: 15px;
    padding: 10px 10px 10px 10px;
    color: #fff;
    background-color: #6E6D6F;
    transition: all 0.3s linear;


    /* retira a borda azul qundo clica nele (da pra suar em button tambem) */
    &:focus{
        outline: thin dotted;
        outline: 0px auto -webkit-focus-ring-color;
        outline-offset: 0px;
    }

    @media ${Device.tablet} {
        & {
            min-height: 40px;
        }
    }
`;
