import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container } from './styles';

const DropDown = ({ itens = [] }) => {

    function DropDownItem ({children, func }){
        return (
            <button type="button" onClick={func}>
                {children}
            </button>
        )
    }

    return (
        <Container >
            {itens.map((item, key) =>
                <DropDownItem key={key} func={item.func} >{item.name}</DropDownItem>
            )}
        </Container>
    );
}

export default DropDown;
