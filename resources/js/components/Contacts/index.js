import React, { useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from '../../contexts/auth';
import { api } from '../../services/api';
import { Container } from './styles';
import Header from '../Header';

import IconFem from '../../assets/img/icon-fem.svg';
import IconMas from '../../assets/img/icon-mas.svg';

const Contacts = () => {
    const { userLogued, setChatCurrent } = useContext(AuthContext);
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
            getListPrivateChats(userLogued);
            setUserHeader({ name: `Olá, ${userLogued.name}`, status: null });
        }
    }, [userLogued]);

    const getListPrivateChats = useCallback((userLogued) =>{
        api.get('/privatechats/show')
        .then(res => {
            setContacts(getContacts(res, userLogued));
        }).catch(error => {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        });
    }, [userLogued]);

    function getContacts(contacts, userLogued) {
        return contacts.map(contact => {
            let user = (Number(contact.user_id_one) === Number(userLogued.id)) ? 'user_two' : 'user_one';
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
        const dateDifference = new Date(dateCurrent - dateMsg).getDate();

        let dateFinal = 'ontem';

        if (dateDifference === 1) {
            dateFinal = new Intl.DateTimeFormat('pt-bt', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
            }).format(dateMsg);
        }

        if (dateDifference >= 3) {
            dateFinal = new Intl.DateTimeFormat('pt-bt', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }).format(dateMsg);
        }

        return dateFinal;
    }

    return (
        <Container>
            <Header icon={IconMas} itensDropDown={itensDropDown} sair={true} infoUser={userHeader} />

            <main>
                {contacts.map((contact, key) => (
                    <div key={key}>
                        <div className="imgDiv">
                            <img src={IconFem} alt=""/>
                        </div>
                        <div className="infoContac" onClick={() => setChatCurrent(contact)}>
                            <div className="info name">
                                <p>{contact.nameUserChat}</p>
                                <p>{!!contact.lastMenssage && contact.lastMenssage.dateTime}</p>
                            </div>
                            <div className="info utimaMsg">
                                <i>{!!contact.lastMenssage && contact.lastMenssage.body}</i>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </Container>
    );
}

export default Contacts;
