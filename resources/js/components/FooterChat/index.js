import React, { useState, useContext, useRef } from 'react';
import { Form } from "@unform/web";
import { api } from '../../services/api';
import Input from '../Input';
import AuthContext from '../../contexts/auth';
import { FiChevronsRight } from 'react-icons/fi';
import { Container } from './styles';

const FooterChat = () => {
    const { userLogued, chatCurrent } = useContext(AuthContext);
    const formRef = useRef(null);

    function handleSubmit(e) {
        if (e.body !== '') {
            sendMessage(e.body);
        }
    }

    function sendMessage(body) {
        api.post('/messages', {
            body,
            in_hash_chat: chatCurrent.hashChat,
            to_user_id: chatCurrent.idUserChat
        }).then(resp => {
            formRef.current.setData({ body: '' });

        }).catch(error => {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        });
    }

    return (
        <Container >
            <Form onSubmit={handleSubmit} className="fomMsg" ref={formRef}>
                <Input  name="body" placeholder="digite sua mensagem" type="text"/>

                <button type="submit" className="enter"><FiChevronsRight size={30} /></button>
            </Form>
        </Container>
    )
};

export default FooterChat;
