import React from 'react';
import { GiCancel } from 'react-icons/gi';
import { Container } from './styles';

const Modal = ({ togleModal, modalIsOpen, children, width, height }) => {

    return (
        <>
            {!!modalIsOpen && (
                <Container width={width} height={height} >
                    <section className="modalSection">
                        <button type="button" onClick={togleModal}>
                            <GiCancel size={30} color="#ef2d56" />
                        </button>
                        <main>
                            { children }
                        </main>
                    </section>
                </Container>
            )}
        </>
    );
}

export default Modal;
