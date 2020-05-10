import React, { useEffect, useRef, useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import { Container } from './styles';
import HeaderChat from '../HeaderChat';
import FooterChat from '../FooterChat';
import { FiTrash2 } from 'react-icons/fi';

import ImgChat  from '../../assets/img/chat.svg';

import {
    deleteMensage,
    handleAnimation,
    getMessages,
    refactorMessagesInitial,
    scrollToBottom
} from './scripts';

const Chat = ({ toglePage, modo }) =>{
    const divRef = useRef();

    const {
        chatCurrent,
        userLogued,
        lastMsgChatCurrent
    } = useContext(AuthContext);

    const [ messages, setMessages ] = useState([]);

    useEffect(()=>{
        if (Object.entries(chatCurrent).length > 0) {
            (async () => {
                const messagesBanco = await getMessages(chatCurrent.id);
                setMessages(refactorMessagesInitial(messagesBanco, userLogued.telephone));
                scrollToBottom(divRef);
            })();
        } else {
            setMessages([]);
        }
    }, [chatCurrent]);

    useEffect(()=>{
        if (Object.entries(lastMsgChatCurrent).length > 0) {
            setMessages(messages => [...messages, lastMsgChatCurrent]);

            const timeOut = setTimeout(() => {
                scrollToBottom(divRef);
                clearTimeout(timeOut);
            }, 5);
        }
    }, [lastMsgChatCurrent]);

    async function deleteMsg(id_msg) {
        const delMsg = await deleteMensage(id_msg);
        if (delMsg === 201) {
            setMessages(mensages => mensages.filter(msg => msg.id !==id_msg));
            scrollToBottom(divRef);
        }
    }

    return(
        <Container >
            <HeaderChat isMobile={modo} funcToglePage={toglePage} />

            <img src={ImgChat} alt="" className="imgChat"/>
            <main ref={divRef}>
                {messages.map((msg, key) => (
                    <div key={key} className={'msgDiv '+ msg.class}>
                        <div className={'msg '+ msg.class + 'Div'}>
                            <span className={'deletMsg '+ msg.class} onClick={() => deleteMsg(msg.id, key)} onAnimationEnd={() => handleAnimation(event)} >
                                <i><FiTrash2 size={14} color="#dadada"/></i>
                            </span>
                            <span className="body">
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
