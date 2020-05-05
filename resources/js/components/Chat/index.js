import React, { useEffect, useRef, useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import { api } from '../../services/api';
import { Container } from './styles';
import HeaderChat from '../HeaderChat';
import FooterChat from '../FooterChat';

import IconMas from '../../assets/img/icon-mas.svg';

const Chat = () =>{
    const divRef = useRef();
    const { userLogued, chatCurrent } = useContext(AuthContext);
    const [ messages, setMessages ] = useState([]);

    function scrollToBottom() {
        divRef.current.scrollTo(0, divRef.current.scrollHeight);
    }

    useEffect(()=>{
        if (Object.entries(userLogued).length > 0) {
            getMessages();
        }

        window.Echo.private(`message.received.${chatCurrent.hashChat}`).listen('SendMessage', (e) => {
            setMessages(msgs => [...msgs, structureMessageRealTime(e)]);
            scrollToBottom();
        });
    }, [chatCurrent]);

    function getMessages() {
        api.get('/messages', {
            hash_chat: chatCurrent.hashChat
        }).then(resp => {
            console.log(resp);

            setMessages(structureMessagesInitial(resp));
            scrollToBottom();

        }).catch(error => {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        });
    }

    function structureMessagesInitial(msgs) {
        return msgs.map(msg => {
            return {
                id: msg.id,
                body: msg.body,
                time: getTimeMsg(msg.created_at),
                from: Number(msg.from_user_id),
                to: Number(msg.to_user_id),
                class: getClassMsg(Number(msg.from_user_id))
            }
        });
    }

    function structureMessageRealTime(msg) {
        return {
            id: msg.id,
            body: msg.body,
            time: getTimeMsg(msg.created_at),
            from: Number(msg.from_user_id),
            to: Number(msg.to_user_id),
            class: getClassMsg(Number(msg.from_user_id))
        }
    }

    function getClassMsg(from) {
        if (from === Number(userLogued.id)) {
            return 'user';
        }

        return '';
    }

    function getTimeMsg(date) {
        return new Intl.DateTimeFormat('pt-bt', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        }).format(new Date(date));
    }

    return(
        <Container >
            <HeaderChat icon={IconMas} />

            <main ref={divRef}>
                {messages.map((msg, key) => (
                    <div key={key} className={'msgDiv '+ msg.class}>
                        <div className="msg">
                            <span>
                                {msg.body}
                            </span>
                            <i>{msg.time}</i>
                        </div>
                    </div>
                ))}
            </main>

            <FooterChat />
        </Container>
    );
}

export default Chat;
