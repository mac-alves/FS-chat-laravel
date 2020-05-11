import React, { useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from '../../contexts/auth';
import { Container } from './styles';
import HeaderContact from '../HeaderContact';
import { AiFillWechat } from 'react-icons/ai';

import {
    getListContacts,
    refactorContactList,
    postContact,
    refactorContactRealTime
} from './scripts';

import { refactorMessageRealTime } from '../Chat/scripts';


const Contacts = ({ toglePage, modo }) => {
    const {
        userLogued,
        setChatCurrent,
        lastMsgChatCurrent,
        setLastMsgChatCurrent,
        contacts,
        setContacts
    } = useContext(AuthContext);

    const [ userHeader, setUserHeader ] = useState({
        name: null,
        status: null
    });
    const setInfoUserHeader = () => setUserHeader({name: userLogued.at_sign, status: null});

    const updateListContacts = async () => {
        const contactsBanco = await getListContacts();

        setContacts(refactorContactList(contactsBanco));
    };

    useEffect(() => {
        if (Object.entries(lastMsgChatCurrent).length > 0 ||
            Object.entries(contacts).length > 0) {
            updateListContacts();
        }
    }, [lastMsgChatCurrent]);

    useEffect(() => {
        setInfoUserHeader();
        updateListContacts();

        window.Echo.private(`message.received.${userLogued.telephone}`).listen('SendMessage', (event) => {
            if (Object.entries(event).length > 0) {
                 const isListed = (contacts.length === 0) ? false : contacts.some(contact => contact.telephone === event.from_user);

                if (isListed === true) {
                    setLastMsgChatCurrent(refactorMessageRealTime(event));
                } else {
                    (async () => {
                        const newContact = await postContact(event.from_user, event.body, 'SIM');

                        setContacts(contacts =>
                            [...contacts, refactorContactRealTime(newContact.info.contact, newContact.info.last_message)]
                        );
                    })();
                }
            }
        });
    }, [userLogued]);

    return (
        <Container>
            <HeaderContact infoUser={userHeader} isMobile={modo} />

            <main>
                {contacts.map((contact, key) => (
                    <div key={key}>
                        <div className="imgDiv">
                            {(!!contact.img) ? <img src={contact.img} alt=""/> : <AiFillWechat size={54} color="#ef2d56" /> }
                        </div>
                        <div className="infoContac" onClick={() => {setChatCurrent(contact); if(modo){toglePage('homechat')}}}>
                            <div className="info name">
                                <p>{contact.name}</p>
                                <p>{!!contact.lastMessage && contact.lastMessage.dateTime}</p>
                            </div>
                            <div className="info utimaMsg">
                                <i>
                                    {(!!contact.lastMessage && (contact.lastMessage.from === userLogued.telephone)) ? "Você: ": ""}
                                    {!!contact.lastMessage && contact.lastMessage.body}
                                </i>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

        </Container>
    );
}

export default Contacts;
