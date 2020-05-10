import React, { useContext } from 'react';
import { api } from '../../services/api';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';
import { AiFillWechat } from 'react-icons/ai';
import HeaderItem from '../HeaderItem';

const HeaderChat = () => {
    const {
        chatCurrent,
        setLastMsgChatCurrent,
        setChatCurrent
    } = useContext(AuthContext);

    const itensDorpDown = [
        { name: 'Deletar Contato', func: handleDeleteContact }
    ]

    async function handleDeleteContact() {
        const msg = await deleteContact(chatCurrent.id);

        if (Object.entries(msg).length > 0) {
            setLastMsgChatCurrent({});
            setChatCurrent({});
        }
    }

    function deleteContact(id) {
        return api.delete(`/contacts/${id}`).catch(error => {
            console.log(error);
            alert(`Erro ao excluir contato, tente novamente`);
        });
    }

    return (
        <Container >
            <div className="userContact">
                { (!!chatCurrent.img) ? <img src={chatCurrent.img} alt=""/> :
                  (!!chatCurrent.name) ? <AiFillWechat size={50} color="#ef2d56" /> : <div></div>}
                <div className="info">
                    <p>{!!chatCurrent && chatCurrent.name}</p>
                </div>
            </div>

            {!!chatCurrent.name && (
                <HeaderItem
                    icon={<FiMoreVertical size={25} color="#ef2d56" />}
                    dropDownItens={itensDorpDown} />
            )}
        </Container>
    );
}

export default HeaderChat;
