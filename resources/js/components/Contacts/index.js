import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { Container } from './styles';
import Header from '../Header';

import IconFem from '../../assets/img/icon-fem.svg';
import IconMas from '../../assets/img/icon-mas.svg';

const List = [
    { name: 'keren', utimaMsg: 'nada alem de nada', photo: IconFem },
    { name: 'Mauricio', utimaMsg: 'nada alem de nada', photo: IconMas },
    { name: 'keren', utimaMsg: 'nada alem de nada', photo: IconFem },
]

const itensDropDown = [
    { title: 'Adcionar Contatos', function: ''},
    { title: 'Conta', functionlink: ''},
    { title: 'Sair', function: ''}
];

const Contacts = () => {

    const [ itensDropDown, setItensDropDown ] = useState([
        { title: 'Adcionar Contatos', function: () => {}},
        { title: 'Conta', functionlink: () => {}},
    ]);

    return (
        <Container>
            <Header icon={IconMas} itensDropDown={itensDropDown} sair={true} />

            <main>
                {List.map((item, key) => (
                    <div key={key}>
                        <div className="imgDiv">
                            <img src={item.photo} alt=""/>
                        </div>
                        <div className="infoContac">
                            <div className="info name">
                                <p>{item.name}</p>
                            </div>
                            <div className="info utimaMsg">
                                <i>{item.utimaMsg}</i>
                                <i>19:00</i>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </Container>
    );
}

export default Contacts;
