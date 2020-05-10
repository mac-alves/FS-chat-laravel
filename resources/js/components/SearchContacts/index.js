import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../../contexts/auth';
import { Container, Input } from './styles';
import { AiFillWechat } from 'react-icons/ai';
import { TiArrowRightOutline } from 'react-icons/ti';
import { FiAtSign } from 'react-icons/fi'
import { getListContactsSystem } from './scripts';
import { CSSTransition } from 'react-transition-group';

import AddContact from '../AddContact';

function SearchContacts({ togleModal }) {
    const dropdownRef = useRef(null);
    const { userLogued } = useContext(AuthContext);
    const [ contacts, setContacts ] = useState([]);
    const [ inputValue, setInputValue ] = useState('');
    const [ activePage, setActivePage ] = useState('listcont');
    const [ activeContact, setActiveContact ] = useState({});
    const [ pageHeight, setPageHeight ] = useState(null);

    useEffect(() => {
        if (contacts.length > 0) {
            setPageHeight(contacts.length*68+68);
        }
    }, [contacts]);

    useEffect(()=>{
        if (inputValue.length !== 0){
            let value = '@'+inputValue;
            getList(value);
        }
    }, [inputValue]);

    function calcHeight(event) {
        const height = event.offsetHeight+15;
        setPageHeight(height);
    }

    function handleOnChage(event){
        setInputValue(event.target.value);
    }

    async function getList(atSign){
        let contacList = await getListContactsSystem(atSign);
            contacList = contacList.filter(contact => contact.id !== userLogued.id);

        setContacts(contacList);
    }

    function handleContact(page, contact){
        setActivePage(page);
        setActiveContact(contact);
    }

    return (
        <Container style={{ height: pageHeight}} ref={dropdownRef}>
            <CSSTransition
                in={activePage === 'listcont'}
                timeout={500}
                classNames="listcont"
                unmountOnExit
                onEnter={calcHeight}>
                <div>
                    <div className="searchCont">
                        <span><FiAtSign size={24} color="#ef2d56" /></span>
                        <Input
                            minLength={1}
                            debounceTimeout={500}
                            onChange={handleOnChage}
                            placeholder="Digite o nome do Contato..."/>
                    </div>

                    <div className="listContacts">
                        {contacts.map((contact, key) => (
                            <div key={key}>
                                <div className="img">
                                    {(!!contact.img) ? <img src={contact.img} alt=""/> : <AiFillWechat size={54} color="#ef2d56" /> }
                                </div>
                                <div className="info">
                                    <div className="name">
                                        <p>{contact.name}</p>
                                    </div>
                                    <div className="at-sign">
                                        <i>{!!contact.at_sign && contact.at_sign}</i>
                                    </div>
                                </div>
                                <div className="add">
                                    <i onClick={() => handleContact('pageuser', contact)} ><TiArrowRightOutline size={40} /></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activePage === 'pageuser'}
                timeout={500}
                classNames="pageuser"
                unmountOnExit
                onEnter={calcHeight}>

                <AddContact
                    serContact={handleContact}
                    contact={activeContact}
                    cloneModal={togleModal} />

            </CSSTransition>
        </Container>
    );
}

export default SearchContacts;
