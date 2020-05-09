
import { api } from '../../services/api';

const URL_GET_CONTACTS = '/contacts/show';
const URL_POST_CONTACT = '/contacts';

/**
 * retorna a a lista de contatos atualizada com a utima msg que chegou de um contato
 */
export const setNewLastMsgContactCurrent = (idChatCurrent, lastNewMsg, contacts) => {
    contacts.forEach((contact, key) => {
        if (contact.idChat === idChatCurrent) {
            contacts[key].lastMenssage = getLastMenssage(lastNewMsg);
        }
    });

    return contacts;
}

/**
 * retorna um array dos contatos estruturados
 */
export const refactorContactList= (contacts) => {
    return contacts.map(contact => {
        return {
            id: contact.id,
            name: contact.name,
            atSign: contact.at_sign,
            telephone: contact.telephone,
            createdAt: contact.created_at,
            lastMessage: refactorLastMenssage(contact.last_message)
        }
    });
}

/**
 * retirna um nova estrutura de objeto da utima msg
 */
export const refactorLastMenssage = (lastMenssage) => {
    if (lastMenssage) {
        return {
            id: lastMenssage.id,
            body: lastMenssage.body,
            from: lastMenssage.from_user,
            to: lastMenssage.to_user,
            dateTime: getDateLastMenssage(lastMenssage.created_at)
        }
    }

    return null
}

/**
 * refatora os dados do contato criado por recebe uma mensage
 */
export const refactorContactRealTime= (contact, last_message) => {
    return {
        id: contact.id,
        name: contact.name,
        atSign: contact.at_sign,
        telephone: contact.telephone,
        createdAt: contact.created_at,
        lastMessage: refactorLastMenssage(last_message)
    }
}

/**
 * retorna a string com o tempo da utima msg do contato
 */
export const getDateLastMenssage = (date) => {
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

/**
 * retorna a lista de contatos do banco
 */
export const getListContacts = (idUserLoged) =>{
    return api.get(URL_GET_CONTACTS).catch(error => {
        console.log(error);
        alert(`Erro no logout, tente novamente`);
    });
};

/**
 * cria um contato
 */
export const postContact = (tel_contact, body, inverse = null) =>{
    return api.post(URL_POST_CONTACT, { body, tel_contact, inverse }).catch(error => {
        console.log(error);
        alert(`Erro no logout, tente novamente`);
    });
};
