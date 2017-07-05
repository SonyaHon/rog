import React, {Component} from 'react';
import './app.css';

import Game from './game_scripts/Game';

class App extends Component {

    constructor(props) {
        super(props);

        this.Game = new Game(80, 20);
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

export default App;