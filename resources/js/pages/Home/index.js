import React from 'react';

import { Container } from './styles';

import Chat from '../../components/Chat';
import Contacts from '../../components/Contacts';

function Home() {
    return (
        <Container>
            <Contacts />
            <Chat />
        </Container>
    );
}

export default Home;
