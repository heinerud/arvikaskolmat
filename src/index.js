import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

let api = 'https://skolmat-api.herokuapp.com';

ReactDOM.render(<BrowserRouter>
    <div>
        <Route path='/school' render={() => <App url={api + '/school'} />} />
        <Route path='/preschool' render={() => <App url={api + '/preschool'} />} />
    </div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
