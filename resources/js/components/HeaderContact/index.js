import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import Modal from '../Modal';
import SearchContacts from '../SearchContacts';
import HeaderItem from '../HeaderItem';

const HeaderContact = ({ infoUser }) => {

    const { logout } = useContext(AuthContext);
    const [ modalAddContactIsOpen, setModalAddContactIsOpen ] = useState(false);

    const itensDorpDown = [
        { name: 'Adcionar Contato', func: handleOpenModal },
        { name: 'Sair', func: handleLogout }
    ]

    function handleLogout(){
        logout();
    }

    function handleOpenModal(){
        setModalAddContactIsOpen(status => !status);
    }

    return (
        <Container >
            <div className="userContact">
                {(!!infoUser.img) ? <img src={infoUser.img} alt=""/> : <AiOutlineAliwangwang size={50} color="#ef2d56" /> }
                <div className="info">
                    <p>{!!infoUser && infoUser.name}</p>
                    <i>{!!infoUser && infoUser.status}</i>
                </div>
            </div>

            <HeaderItem
                icon={<FiMoreVertical size={25}
                color="#ef2d56" />}
                dropDownItens={itensDorpDown} />

            <Modal modalIsOpen={modalAddContactIsOpen} togleModal={handleOpenModal}>
                <SearchContacts togleModal={handleOpenModal} />
            </Modal>
        </Container>
    );
}

export default HeaderContact;
