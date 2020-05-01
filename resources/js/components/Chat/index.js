import React, { useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';
import Header from '../Header';
import FooterChat from '../FooterChat';

import IconMas from '../../assets/img/icon-mas.svg';

const Msg = [
    { class:'user', msg:'Oi.. voce vai hoje ?', horario: '11:20'},
    { class:'', msg:'Oi.. acho que sim', horario: '11:20'},
    { class:'user', msg:'que horas voce vai?', horario: '11:20'},
    { class:'user', msg:'é a noite, acho que a galera vai toda de uma vez, mas não tava querendo', horario: '11:20'},
    { class:'', msg:'acho que umas 20h', horario: '11:20'},
    { class:'user', msg:'tudo bem vou te esperar la', horario: '11:20'},
    { class:'', msg:'ok, me espera na porta', horario: '11:20'},
    { class:'user', msg:'ok, tchau', horario: '11:20'},
    { class:'', msg:'tchau', horario:'11:20'},
    { class:'user', msg:'Oi.. voce vai hoje ?', horario: '11:20'},
    { class:'', msg:'Oi.. acho que sim', horario: '11:20'},
    { class:'user', msg:'que horas voce vai?', horario: '11:20'},
    { class:'user', msg:'é a noite, acho que a galera vai toda de uma vez, mas não tava querendo', horario: '11:20'},
    { class:'', msg:'acho que umas 20h', horario: '11:20'},
    { class:'user', msg:'tudo bem vou te esperar la', horario: '11:20'},
    { class:'', msg:'ok, me espera na porta', horario: '11:20'},
    { class:'user', msg:'ok, tchau', horario: '11:20'},
    { class:'', msg:'tchau', horario:'11:20'},
    { class:'user', msg:'Oi.. voce vai hoje ?', horario: '11:20'},
    { class:'', msg:'Oi.. acho que sim', horario: '11:20'},
    { class:'user', msg:'que horas voce vai?', horario: '11:20'},
    { class:'user', msg:'é a noite, acho que a galera vai toda de uma vez, mas não tava querendo', horario: '11:20'},
    { class:'', msg:'acho que umas 20h', horario: '11:20'},
    { class:'user', msg:'tudo bem vou te esperar la', horario: '11:20'},
    { class:'', msg:'ok, me espera na porta', horario: '11:20'},
    { class:'user', msg:'ok, tchau', horario: '11:20'},
    { class:'', msg:'tchau', horario:'11:20'},
    { class:'user', msg:'Oi.. voce vai hoje ?', horario: '11:20'},
    { class:'', msg:'Oi.. acho que sim', horario: '11:20'},
    { class:'user', msg:'que horas voce vai?', horario: '11:20'},
    { class:'user', msg:'é a noite, acho que a galera vai toda de uma vez, mas não tava querendo', horario: '11:20'},
    { class:'', msg:'acho que umas 20h', horario: '11:20'},
    { class:'user', msg:'tudo bem vou te esperar la', horario: '11:20'},
    { class:'', msg:'ok, me espera na porta', horario: '11:20'},
    { class:'user', msg:'ok, tchau', horario: '11:20'},
    { class:'', msg:'tchau', horario:'11:20'},
    { class:'user', msg:'ok, tchau', horario: '11:20'},
    { class:'', msg:'tchau', horario:'11:20'},
    { class:'user', msg:'Oi.. voce vai hoje ?', horario: '11:20'},
    { class:'', msg:'Oi.. acho que sim', horario: '11:20'},
    { class:'user', msg:'que horas voce vai?', horario: '11:20'},
    { class:'user', msg:'é a noite, acho que a galera vai toda de uma vez, mas não tava querendo', horario: '11:20'},
    { class:'', msg:'acho que umas 20h', horario: '11:20'},
    { class:'user', msg:'tudo bem vou te esperar la', horario: '11:20'},
    { class:'', msg:'ok, me espera na porta', horario: '11:20'},
    { class:'user', msg:'ok, tchau', horario: '11:20'},
    { class:'', msg:'tchau', horario:'11:20'},
];

const contact = { name: 'keren', status: 'online'}

const Chat = () =>{
    const divRef = useRef();

    function scrollToBottom() {
        divRef.current.scrollTo(0, divRef.current.scrollHeight);
    }

    useEffect(()=>{
        scrollToBottom();

        getMessages();
    }, []);

    function getMessages() {
        try {
            api.get('/messages').then(resp => {
                console.log(resp);
            });
        } catch (error) {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        }
    }

    function structureMessages(msgs) {

    }

    return(
        <Container >
            <Header icon={IconMas} infoUser={contact} />

            <main ref={divRef}>
                {Msg.map((msg, key) => (
                    <div key={key} className={'msgDiv '+ msg.class}>
                        <div className="msg">
                            <span>
                                {msg.msg}
                            </span>
                            <i>{msg.horario}</i>
                        </div>
                    </div>
                ))}
            </main>

            <FooterChat />
        </Container>
    );
}

export default Chat;
