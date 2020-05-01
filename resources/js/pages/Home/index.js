import React from 'react';
import { AuthProvider } from '../../contexts/auth';
import { Container } from './styles';

import Chat from '../../components/Chat';
import Contacts from '../../components/Contacts';

function Home() {
    return (
        <AuthProvider>
            <Container>
                <Contacts />
                <Chat />
            </Container>
        </AuthProvider>
    );
}

export default Home;
