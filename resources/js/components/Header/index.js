import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';
import { AiOutlineAliwangwang } from 'react-icons/ai';

const Header = ({ infoUser, itensDropDown, sair }) => {

    const divRef = useRef();
    const { logout } = useContext(AuthContext);
    const [ classAnimation, setClassAnimation ] = useState('');

    function handleAnimation(e) {
        if (e.animationName === 'fade-in') {
            setClassAnimation('did-fade-in');

        } else if (e.animationName === 'fade-out') {
            setClassAnimation('');
        }
    }

    function handleLogout(){
        logout();
    }

    return (
        <Container >
            <div className="userContact">
                {(!!infoUser.img) ? <img src={infoUser.img} alt=""/> : <AiOutlineAliwangwang size={50} color="#ef2d56" /> }
                <div className="info">
                    <p>{!!infoUser && infoUser.name}</p>
                    <i>{!!infoUser && infoUser.status}</i>
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
                        {!!sair && <li onClick={handleLogout} >Sair</li>}
                    </ul>
                </div>
            </div>
        </Container>
    );
}

export default Header;
