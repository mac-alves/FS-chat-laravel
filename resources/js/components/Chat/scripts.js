import { api } from '../../services/api';

const URL_GET_MESSAGES = '/messages';
const URL_DELETE_MESSAGES = '/messages';

/**
 * responsavel pela animaçaõ do botão de delet do chat
 */
export const handleAnimation = (event) => {
    if (event.animationName === 'fade-in') {
        event.path[0].className = 'did-fade-in';

    } else if (event.animationName === 'fade-out') {
        event.path[0].className = '';
    }
}

/**
 * pegas as mensages do da conversa ao ser selecionada
 */
export const getMessages = (contact_user_id) => {
    return api.get(URL_GET_MESSAGES, { contact_user_id }).catch(error => {
        console.log(error);
        alert(`Erro no logout, tente novamente`);
    });
}

/**
 * reestrutura do array de mensagens inicial do banco
 */
export const refactorMessagesInitial = (msgs, telUserLoged) =>{
    return msgs.map(msg => refactorMessageRealTime(msg, telUserLoged));
}

/**
 * parte da função acima
 */
export const refactorMessageRealTime = (msg, telUserLoged) => {
    return {
        id: msg.id,
        body: msg.body,
        time: refactorTimeMsg(msg.created_at),
        from: msg.from_user,
        to: msg.to_user,
        class: determineClass(msg.from_user, telUserLoged)
    }
}

/**
 * determida se a msg é do usuario logado ou do contato e retorna a classe corre.
 */
export const determineClass = (from, telUserLoged) => {
    if (from === telUserLoged) {
        return 'user';
    }

    return '';
}

/**
 * refatora o horario da mensagem.
 */
export const refactorTimeMsg = (date) => {
    return new Intl.DateTimeFormat('pt-bt', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }).format(new Date(date));
}

/**
 * deleta uma mensagem no back
 */
export const deleteMensage = (id_msg) => {
    return api.delete(URL_DELETE_MESSAGES, {id_msg}).catch(error => {
        console.log(error);
        alert(`Erro no logout, tente novamente`);
    });
}

/**
 * responsavel por fazer a tela correr para baixo sempre que chega msg
 */
export const scrollToBottom = (ref) => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
}
