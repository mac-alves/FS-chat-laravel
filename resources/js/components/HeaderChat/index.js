import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';

const HeaderChat = ({ icon, infoUser, itensDropDown }) => {

    const divRef = useRef();
    const { logout, chatCurrent } = useContext(AuthContext);
    const [ classAnimation, setClassAnimation ] = useState('');

    function handleAnimation(e) {
        if (e.animationName === 'fade-in') {
            setClassAnimation('did-fade-in');

        } else if (e.animationName === 'fade-out') {
            setClassAnimation('');
        }
    }

    return (
        <Container >
            <div className="userContact">
                <img src={icon} alt=""/>

                <div className="info">
                    <p>{!!chatCurrent && chatCurrent.nameUserChat}</p>
                    {/* <i>{!!chatCurrent && 'online'}</i> */}
                </div>
            </div>

            <div
                ref={divRef}
                className="iconsFuncs"
                onAnimationEnd={() => handleAnimation(event)}>

                <FiMoreVertical size={25}/>

                <div className={'dropDown ' + classAnimation}>
                    <ul>
                        {!!itensDropDown && itensDropDown.map((item, key) => (
                            <li key={key} onClick={() => handleLogout(e)} >{item.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
}

export default HeaderChat;
