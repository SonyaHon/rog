import React, {Component} from 'react';
import {connect} from 'react-redux';
import './app.css';

import Game from './game_scripts/Game';

const GLYPH_HEIGHT = 15.625;
const GLYPH_WIDTH = 10;

class App extends Component {

    constructor(props) {
        super(props);

        let maph = Math.floor(parseInt(props.config['screen-height']) / GLYPH_HEIGHT);
        let mapw = Math.floor(parseInt(props.config['screen-width']) / GLYPH_WIDTH);

        this.Game = new Game(mapw, maph);
        this.Game.init();
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
        this.refs.screen.appendChild(this.Game.getDisplay().getContainer());
        let self = this;
        function bindEventToScreens(event) {
            window.addEventListener(event, function (e) {
                if(self.Game._currentScreen !== null) {
                    self.Game._currentScreen.handleInput(event, e, self.Game);
                }
            });
        }

        bindEventToScreens('keyup');
        bindEventToScreens('keydown');
        bindEventToScreens('keypress');

        this.Game.switchScreen('startScreen');
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

export default connect(mapStateToProps)(App);