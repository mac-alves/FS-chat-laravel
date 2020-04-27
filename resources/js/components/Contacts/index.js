import React from 'react';

import { Container } from './styles';
import Header from '../Header';
import IconFem from '../../assets/img/icon-fem.svg';
import IconMas from '../../assets/img/icon-mas.svg';

const List = [
    { name: 'keren', utimaMsg: 'nada alem de nada', photo: IconFem },
    { name: 'Mauricio', utimaMsg: 'nada alem de nada', photo: IconMas },
    { name: 'keren', utimaMsg: 'nada alem de nada', photo: IconFem },
]

const Contacts = () => (
    <Container>
        <Header icon={IconMas} />

        <main>
            {List.map((item, key) => (
                <div key={key}>
                    <div className="imgDiv">
                        <img src={item.photo} alt=""/>
                    </div>
                    <div className="infoContac">
                        <div className="name">
                            <p>{item.name}</p>
                            <p>19:00</p>
                        </div>
                        <div>
                            <i>{item.utimaMsg}</i>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    </Container>
);

export default Contacts;
