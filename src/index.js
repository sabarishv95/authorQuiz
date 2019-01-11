import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authors, getTurnData } from './authorData';
import { AddAuthorForm } from './AddAuthorForm';

let state = {
    turnData: getTurnData(authors),
}

function resetState() {
    state = {
        turnData: getTurnData(authors),
    }
}
function Application() {
    function onContinue() {
        console.log('asd')
        resetState();
    }
    return <App {...state} continue={onContinue}/>
}

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path='/' component={Application} />
            <Route path='/add' component={AddAuthorForm}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
