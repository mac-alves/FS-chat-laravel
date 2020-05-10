import React, { useState, useContext, useRef, useEffect } from 'react';
import { Form } from "@unform/web";
import { api } from '../../services/api';
import Input from '../Input';
import AuthContext from '../../contexts/auth';
import { FiChevronsRight } from 'react-icons/fi';
import { Container } from './styles';

import { refactorMessageRealTime } from '../Chat/scripts';

const FooterChat = () => {
    const {
        chatCurrent,
        setLastMsgChatCurrent,
        userLogued
    } = useContext(AuthContext);

    const [ formDisabled, setFormDisabled ] = useState(true);
    const formRef = useRef(null);

    async function handleSubmit(e) {
        if (e.body !== '') {
           const msg = await sendMessage(e.body, chatCurrent.telephone, chatCurrent.id);
           if (Object.entries(msg).length > 0) {
            setLastMsgChatCurrent(refactorMessageRealTime(msg, userLogued.telephone));
            formRef.current.setData({ body: '' });
           }
        }
    }

    function sendMessage(body, telephone, contact_user_id) {
        return api.post('/messages', { body, telephone, contact_user_id }).catch(error => {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        });
    }

    useEffect(() => {
        if (Object.entries(chatCurrent).length > 0) {
            setFormDisabled(false);
        }
    }, [chatCurrent]);

    return (
        <Container >
            <Form onSubmit={handleSubmit} className="fomMsg" ref={formRef}>
                <Input name="body" placeholder="digite sua mensagem" type="text" disabled={formDisabled} />

                <button type="submit" className="enter" disabled={formDisabled}><FiChevronsRight size={30} /></button>
            </Form>
        </Container>
    )
};

export default FooterChat;
