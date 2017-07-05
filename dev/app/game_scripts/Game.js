import ROT from 'rot-js';

class Game {
    constructor(width, height) {
        this._display = null;
        this._currentScreen = null;

        ROT.DEFAULT_WIDTH = width;
        ROT.DEFAULT_HEIGHT = height;
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
            this._curretnScreen.exit();
        }
        this._display.clear();
        this._currentScreen = screen;
        if (this._currentScreen !== null) {
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
        else {
            throw new Error('No such screen', screen);
        }
    }
}

export default Game;