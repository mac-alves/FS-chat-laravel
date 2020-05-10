import React, { useRef, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiChevronsRight } from 'react-icons/fi';
import { TiArrowLeftOutline } from 'react-icons/ti';
import Chat from '../../assets/img/chat-contact.svg';
import { Form } from "@unform/web";
import Input from '../Input';
import { Container } from './styles';

import { postContact } from './scripts';
import { refactorContactRealTime } from '../Contacts/scripts';


function AddContact({ serContact, contact, cloneModal }) {
    const formRef = useRef(null);
    const { setChatCurrent, setContacts, contacts } = useContext(AuthContext);

    async function handleSubmit(e) {
        if (e.body !== '') {
           const newContact = await postContact(e.body, contact.telephone);

            if (Object.entries(newContact).length > 0) {
                const infoNewCont = refactorContactRealTime(newContact.info.contact, newContact.info.last_message);
                const listContac = contacts.filter(contact => contact.id !== infoNewCont.id);

                setContacts([infoNewCont, ...listContac]);
                setChatCurrent(infoNewCont);

                formRef.current.setData({ body: '' });
                cloneModal();
            }
        }
    }

    return (
        <Container >
            <div className="return">
                <i onClick={() => serContact('listcont', {})} ><TiArrowLeftOutline size={40} /></i>
            </div>
            <div className="page">
                <div className="infoUser">
                    <img src={Chat} alt=""/>
                    <h3>{contact.name}</h3>
                    <p>{contact.at_sign}</p>
                </div>
                <Form onSubmit={handleSubmit} className="form-newCont" ref={formRef}>
                    <Input name="body" placeholder="digite sua mensagem" type="text" defaultValue="Ola, vamos conversar ?" />

                    <button type="submit" className="enter"><FiChevronsRight size={30} /></button>
                </Form>
            </div>
        </Container>
    );
}

export default AddContact;
