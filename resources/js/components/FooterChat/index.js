import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { Container } from './styles';

const FooterChat = () => (
    <Container >
        <div className="write">
            <form action="">
                <input type="text" placeholder="digite sua mensagem"/>
            </form>
        </div>
        <div className="enter">
            <FiChevronsRight size={25} />
        </div>
    </Container>
);

export default FooterChat;
