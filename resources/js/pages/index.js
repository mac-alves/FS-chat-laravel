import React from 'react'
import ReactDOM from 'react-dom';

import Home from './Home/index';

if (document.getElementById('main')) {
    ReactDOM.render(<Home />, document.getElementById('main'));
}
