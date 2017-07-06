import React, {Component} from 'react';
import {connect} from 'react-redux';
import './app.css';
import ROT from 'rot-js';

import Game from './game_scripts/Game';

class App extends Component {

    constructor(props) {
        super(props);

        let dcp = new ROT.Display();
        let size = dcp.computeSize(parseInt(props.config['screen-width']), parseInt(props.config['screen-height']));
        this.Game = new Game(size[0], size[1]);
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