import React, {Component} from 'react';
import {connect} from 'react-redux';
import './app.css';
import ROT from 'rot-js';

import Player from './game_scripts/Player';

import Game from './game_scripts/Game';
import Glyph from './game_scripts/Glyph';
import Tile from './game_scripts/Tile';

class App extends Component {

    constructor(props) {
        super(props);

        let dcp = new ROT.Display();
        let size = dcp.computeSize(parseInt(props.config['screen-width']), parseInt(props.config['screen-height']));
        this.Game = new Game(size[0], size[1]);
    }

    render() {
        return(
            <div className="App">
                <div className="Screen" ref="screen">
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.refs.screen.appendChild(this.Game.display.getContainer());
        this.Game.renderCurrentMap();

        let player = new Player({
            glyph: new Glyph({
                char: '@',
                foreground: '#984'
            }),
            x: 10,
            name: 'Vasya the slayer'
        })
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

export default connect(mapStateToProps)(App);