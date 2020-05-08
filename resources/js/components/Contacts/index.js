import React, { useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from '../../contexts/auth';
import { api } from '../../services/api';
import { Container } from './styles';
import Header from '../Header';

import { AiFillWechat } from 'react-icons/ai';

const Contacts = () => {
    const {
        userLogued,
        setChatCurrent,
        lastMsgChatCurrent,
        chatCurrent
    } = useContext(AuthContext);

    const [ userHeader, setUserHeader ] = useState({
        name: null,
        status: null
    });

    const [ contacts, setContacts ] = useState([]);
    const itensDropDown = [
        { title: 'Adcionar Contatos', function: ''},
        { title: 'Conta', functionlink: ''}
    ];

    useEffect(() => {
        if (Object.entries(userLogued).length > 0) {
            getListPrivateChats(userLogued.id);
            setUserHeader({ name: `Olá, ${userLogued.name}`, status: null });
            console.log(userLogued);

        }
    }, [userLogued]);

    useEffect(() => {
        if (Object.entries(lastMsgChatCurrent).length > 0) {
           setNewLastMsgContactCurrent(chatCurrent.idChat, lastMsgChatCurrent);
           console.log('msg');

        }
    }, [lastMsgChatCurrent]);

    function setNewLastMsgContactCurrent(idChatCurrent, lastNewMsg) {
        contacts.forEach((contact, key) => {
            if (contact.idChat === idChatCurrent) {
                contacts[key].lastMenssage = getLastMenssage(lastNewMsg);
            }
        });
        setContacts(contacts);
    }

    const getListPrivateChats = (idUserLoged) =>{
        api.get('/privatechats/show')
        .then(res => {
            setContacts(getContacts(res, idUserLoged));
        }).catch(error => {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        });
    };

    function getContacts(contacts, idUserLoged) {
        return contacts.map(contact => {
            let user = (Number(contact.user_id_one) === Number(idUserLoged)) ? 'user_two' : 'user_one';
            return {
                idChat: contact.id,
                idUserChat: contact[user].id,
                nameUserChat: contact[user].name,
                atSign: contact[user].at_sign,
                hashChat: contact.hash_chat,
                createdAt: contact.created_at,
                lastMenssage: getLastMenssage(contact.last_menssage)
            }
        });
    }

    function getLastMenssage(lastMenssage) {
        if (lastMenssage) {
            return {
                body: lastMenssage.body,
                from: Number(lastMenssage.from_user_id),
                to: Number(lastMenssage.to_user_id),
                dateTime: getDateLastMenssage(lastMenssage.created_at)
            }
        }

        return null
    }

    function getDateLastMenssage(date) {
        const dateCurrent = new Date();
        const dateMsg = new Date(date);
        const dateDifference = new Date(dateCurrent - dateMsg + (dateMsg.getTimezoneOffset() * 60000)).getDate();

        let dateFinal = 'ontem';

        if (dateDifference >= 3) {
            dateFinal = new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }).format(dateMsg);
        }

        if (dateDifference === 1) {
            dateFinal = new Intl.DateTimeFormat('pt-BR', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
            }).format(dateMsg);
        }

        return dateFinal;
    }

    return (
        <Container>
            <Header itensDropDown={itensDropDown} sair={true} infoUser={userHeader} />

            <main>
                {contacts.map((contact, key) => (
                    <div key={key}>
                        <div className="imgDiv">
                            {(!!contact.img) ? <img src={contact.img} alt=""/> : <AiFillWechat size={54} color="#ef2d56" /> }
                        </div>
                        <div className="infoContac" onClick={() => setChatCurrent(contact)}>
                            <div className="info name">
                                <p>{contact.nameUserChat}</p>
                                <p>{!!contact.lastMenssage && contact.lastMenssage.dateTime}</p>
                            </div>
                            <div className="info utimaMsg">
                                <i>
                                    {(!!contact.lastMenssage && (contact.lastMenssage.from === userLogued.id)) ? "Você: ": ""}
                                    {!!contact.lastMenssage && contact.lastMenssage.body}
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
