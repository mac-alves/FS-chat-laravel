import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';
import { AiFillWechat } from 'react-icons/ai';

const HeaderChat = ({ itensDropDown }) => {

    const divRef = useRef();
    const { chatCurrent } = useContext(AuthContext);
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
                { (!!chatCurrent.img) ? <img src={chatCurrent.img} alt=""/> :
                  (!!chatCurrent.nameUserChat) ? <AiFillWechat size={50} color="#ef2d56" /> : <div></div>}
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
