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

    init(w, h) {
        if(arguments.length === 2)
            this._display = new ROT.Display({
                width: w,
                height: h
            });
        else
            this._display = new ROT.Display();
    }

    getDisplay() {
        return this._display;
    }

    switchScreen(screen) {
        if(this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        this._display.clear();
        if(this._screens[screen] !== undefined) {
            this._currentScreen = this._screens[screen];
        }
        else {
            throw new Error('No such screen "' + screen + '"');
        }
        if (this._currentScreen !== null && this._currentScreen !== undefined) {
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
        else {
            throw new Error('No such screen "' + screen + '"');
        }
    }
}

export default Game;