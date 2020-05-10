import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AuthProvider } from '../../contexts/auth';
import { Container } from './styles';
import { CSSTransition } from 'react-transition-group';
import Chat from '../../components/Chat';
import Contacts from '../../components/Contacts';
import { widthWindow, Size } from '../../config';

function Home() {
    const [ activePage, setActivePage ] = useState('homecont');
    const [ isMobile, setIsmobile ] = useState(false);

    useLayoutEffect(() => {
        if (widthWindow <= Size.mobileL) {
            // mobile
            console.log('mobile')
            console.log(widthWindow <= Size.mobileL)
            setIsmobile(true);
        } else {
            // web
            console.log('web')
            console.log((widthWindow+'px') <= Size.mobileL)
            setIsmobile(false);
        }
    }, []);

    return (
        <AuthProvider>
            <Container >
                {isMobile && (
                    <>
                    <CSSTransition
                    in={activePage === 'homecont'}
                    timeout={500}
                    classNames="homecont"
                    unmountOnExit>

                        <Contacts toglePage={setActivePage} modo={isMobile} />
                    </CSSTransition>

                    <CSSTransition
                        in={activePage === 'homechat'}
                        timeout={500}
                        classNames="homechat"
                        unmountOnExit>

                        <Chat toglePage={setActivePage} modo={isMobile} />
                    </CSSTransition>
                    </>
                )}
                {!isMobile && (
                    <>
                     <Contacts />
                     <Chat />
                    </>
                )}
            </Container>
        </AuthProvider>
    );
}

export default Home;
