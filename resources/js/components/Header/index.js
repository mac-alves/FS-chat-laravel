import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

import { Container } from './styles';

const Header = ({ icon, infoUser }) => (
    <Container >
        <div className="iconUser">
            <img src={icon} alt=""/>
        </div>

        <div className="iconsFuncs">
            <FiMoreVertical size={25}/>
        </div>
    </Container>
);

export default Header;
