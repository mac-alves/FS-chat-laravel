import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import AuthContext from '../../contexts/auth';
import { Container } from './styles';
import HeaderContact from '../HeaderContact';
import { AiFillWechat } from 'react-icons/ai';

import {
    getListContacts,
    refactorContactList,
    postContact
} from './scripts';

import { refactorMessageRealTime } from '../Chat/scripts';


const Contacts = ({ toglePage, modo }) => {
    const {
        userLogued,
        setChatCurrent,
        lastMsgChatCurrent,
        setLastMsgChatCurrent,
        contacts,
        setContacts,
        chatCurrent
    } = useContext(AuthContext);

    const [ eventReceived, setEventReceived ] = useState({});

    const [ userHeader, setUserHeader ] = useState({
        name: null,
        status: null
    });

    const setInfoUserHeader = useCallback((userLogued) => setUserHeader({name: userLogued.at_sign, status: null}), []);

    const updateListContacts = useCallback(async () => {
        const contactsBanco = await getListContacts();
        setContacts(refactorContactList(contactsBanco));
    }, []);

    const echoChanel = useCallback(() => {
        window.Echo.private(`message.received.${userLogued.telephone}`).listen('SendMessage', (event) => {
            if (Object.entries(event).length > 0) {
                setEventReceived(event);
            }
        });
    }, [userLogued]);

    useEffect(() => {
        updateListContacts();
    }, [lastMsgChatCurrent, updateListContacts]);

    useMemo(() => {
        setInfoUserHeader(userLogued);
        echoChanel();
    }, [userLogued]);

    useEffect(() => {
        if (Object.entries(eventReceived).length > 0) {
            const isListed = (contacts.length === 0) ? false : contacts.some(contact => contact.telephone === eventReceived.from_user);

            if (isListed === true) {
                if (Object.entries(chatCurrent).length > 0) {
                    setLastMsgChatCurrent(refactorMessageRealTime(eventReceived));
                } else {
                    updateListContacts();
                }
            } else {
                (async () => {
                    await postContact(eventReceived.from_user, eventReceived.body, 'SIM');
                    updateListContacts();
                })();
            }
        }
    }, [eventReceived]);

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
