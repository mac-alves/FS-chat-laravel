
import { api } from '../../services/api';

const URL_GET_LIST_CONTACTS = '/contacts';

/**
 * retorna a lista de contatos do banco
 */
export const getListContactsSystem = (at_sign) =>{
    return api.get(URL_GET_LIST_CONTACTS,  { at_sign }).catch(error => {
        console.log(error);
        alert(`Erro no logout, tente novamente`);
    });
};
