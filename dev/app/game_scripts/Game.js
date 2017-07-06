import ROT from 'rot-js';
import Screens from './Screens';

class Game {
    constructor(width, height) {
        this._display = null;
        this._currentScreen = null;

        ROT.DEFAULT_WIDTH = width;
        ROT.DEFAULT_HEIGHT = height;

        this._screens = Screens;

    }

    init() {
        this._display = new ROT.Display({
            width: ROT.DEFAULT_WIDTH,
            height: ROT.DEFAULT_HEIGHT
        });
    }


    getDisplay() {
        return this._display;
    }

    switchScreen(screen) {
        if(this._screens[screen] !== undefined && this._screens[screen] !== null) {
            if(this._currentScreen !== null) {
                this._currentScreen.exit();
            }
            this._display.clear();
            this._currentScreen = this._screens[screen];
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
        else {
            throw new Error('No such screen: ' + screen);
        }
    }
}

export default Game;