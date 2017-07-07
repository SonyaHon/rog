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

        ROT.LOG_DISPLAY_WIDTH = 30;
        ROT.STAT_DISPLAY_HEIGHT = 6;
        ROT.LOG_DISPLAY_HEIGHT = size[1] - 6;
        this.Game = new Game(size[0] - 30, size[1]);
        this.Game.init();
    }

    render() {
        return(
            <div className="App">
                <div style={{display: 'flex', flexDirection: 'column', borderRight: 'solid 4px #333'}}>
                    <div className="StatDisplay" ref="stats"></div>
                    <div className="LogScreen" ref="log"></div>
                </div>
                <div className="Screen" ref="screen">
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.refs.screen.appendChild(this.Game.getGameDisplay().getContainer());
        this.refs.stats.appendChild(this.Game.getStatsDisplay().getContainer());
        this.refs.log.appendChild(this.Game.getLogDisplay().getContainer());
        let self = this;
        function bindEventToScreens(event) {
            window.addEventListener(event, function (e) {
                if(self.Game._currentScreen !== null) {
                    self.Game._currentScreen.handleInput(event, e, self.Game);
                    self.Game.getGameDisplay().clear();
                    self.Game._currentScreen.render(self.Game.getGameDisplay());
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