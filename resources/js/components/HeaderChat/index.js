import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { TiArrowLeftOutline } from 'react-icons/ti';
import { Container } from './styles';
import { AiFillWechat } from 'react-icons/ai';
import HeaderItem from '../HeaderItem';

const HeaderChat = ({ funcToglePage, isMobile }) => {
    const {
        chatCurrent,
        setLastMsgChatCurrent,
        setChatCurrent
    } = useContext(AuthContext);
    const [ siseIconHeader, setSiseIconHeader ] = useState(50);
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

    useEffect(()=> {
        if (isMobile) {
            setSiseIconHeader(30);
        }
    },[isMobile]);

    return (
        <Container >
            {isMobile && (
                <div className="returnCont">
                    <i onClick={() => funcToglePage('homecont')} ><TiArrowLeftOutline size={siseIconHeader} /></i>
                </div>
            )}
            <div className="userContact">
                { (!!chatCurrent.img) ? <img src={chatCurrent.img} alt=""/> :
                  (!!chatCurrent.name) ? <AiFillWechat size={siseIconHeader} color="#ef2d56" /> : <div></div>}
                <div className="info">
                    <p>{!!chatCurrent && chatCurrent.name}</p>
                </div>
            </div>

            {!!chatCurrent.name && (
                <HeaderItem
                    icon={<FiMoreVertical size={(isMobile) ? siseIconHeader : 30 } color="#ef2d56" />}
                    dropDownItens={itensDorpDown} />
            )}
        </Container>
    );
}

export default HeaderChat;
