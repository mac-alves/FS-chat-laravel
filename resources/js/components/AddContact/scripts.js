import { api } from '../../services/api';

const URL_POST_NEW_CONTACTS = '/contacts';

/**
 * cria um novo contato
 */
export const postContact = (body, tel_contact) => {
    return api.post(URL_POST_NEW_CONTACTS, { body, tel_contact }).catch(error => {
        console.log(error);
        alert(`Erro no logout, tente novamente`);
    });
}
