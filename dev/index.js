import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './mainCss.css';

import StartScreen from './startScreen/startScreen';
import Settings from './settings/settings';
import Game from './app/app';

import reducers from './redux/reducers/index';

function loadFileFromServer(filename) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', filename, false);
    xhr.send();
    return JSON.parse(xhr.response);
}

let beginState = {};
beginState.config = loadFileFromServer('config.json');

let store = createStore(reducers, beginState);

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StartScreen}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/game" component={Game}/>
        </Switch>
    </BrowserRouter>
    </Provider>,
    document.getElementById('viewport')
);
