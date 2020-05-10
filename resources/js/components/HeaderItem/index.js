import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { CSSTransition } from 'react-transition-group';
import { Container } from './styles';
import DropDown from '../DropDown';

const HeaderItem = ({ icon, dropDownItens = [], }) => {
    const [ open, setOpen ] = useState(false);

    return (
        <Container>
            <OutsideClickHandler useCapture onOutsideClick={() => setOpen(false)}>
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className={(open && (dropDownItens.length > 0)) ? 'open' : ''}>
                    { icon }
                    </button>

                    {dropDownItens.length > 0 && (
                        <CSSTransition
                            in={open}
                            timeout={1000}
                            classNames="dropdown"
                            unmountOnExit>

                            <DropDown itens={dropDownItens} />
                        </CSSTransition>
                    )}

            </OutsideClickHandler>
        </Container>
    );
}

export default HeaderItem;
