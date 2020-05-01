import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiMoreVertical } from 'react-icons/fi';
import { Container } from './styles';

const Header = ({ icon, infoUser, itensDropDown, sair }) => {

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

    useEffect(() => {

    }, []);

    function handleLogout(){
        logout();
    }

    return (
        <Container >
            <div className="userContact">
                <img src={icon} alt=""/>

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
