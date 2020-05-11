import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import Modal from '../Modal';
import SearchContacts from '../SearchContacts';
import HeaderItem from '../HeaderItem';

const HeaderContact = ({ infoUser, toglePage, isMobile }) => {

    const { logout } = useContext(AuthContext);
    const [ modalAddContactIsOpen, setModalAddContactIsOpen ] = useState(false);
    const [ siseIconHeader, setSiseIconHeader ] = useState(50);

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

    useEffect(()=>{
        if (isMobile) {
            setSiseIconHeader(30);
        }
    }, [isMobile]);

    return (
        <Container >
            <div className="userContact">
                {(!!infoUser.img) ? <img src={infoUser.img} alt=""/> : <AiOutlineAliwangwang size={siseIconHeader} color="#ef2d56" /> }
                <div className="info">
                    <p>{!!infoUser && infoUser.name}</p>
                    <i>{!!infoUser && infoUser.status}</i>
                </div>
            </div>

            <HeaderItem
                icon={<FiMoreVertical size={(isMobile) ? siseIconHeader : 30 }
                color="#ef2d56" />}
                dropDownItens={itensDorpDown} />

            <Modal modalIsOpen={modalAddContactIsOpen} togleModal={handleOpenModal}>
                <SearchContacts togleModal={handleOpenModal} />
            </Modal>
        </Container>
    );
}

export default HeaderContact;
