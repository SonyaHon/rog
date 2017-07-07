import ROT from 'rot-js';
import Screens from './Screens';

class Game {
    constructor(width, height) {
        this._gameDisplay = null;
        this._logDsiplay = null;
        this._statDisplay = null;

        this._currentScreen = null;

        ROT.DEFAULT_WIDTH = width;
        ROT.DEFAULT_HEIGHT = height;

        this._screens = Screens;

    }

    init() {
        this._gameDisplay = new ROT.Display({
            width: ROT.DEFAULT_WIDTH,
            height: ROT.DEFAULT_HEIGHT
        });
        this._statDisplay = new ROT.Display({
            width: ROT.LOG_DISPLAY_WIDTH,
            height: ROT.STAT_DISPLAY_HEIGHT
        });
        this._logDsiplay = new ROT.Display({
            width: ROT.LOG_DISPLAY_WIDTH,
            height: ROT.LOG_DISPLAY_HEIGHT
        });

        this._statDisplay.drawText(1, 1, 'Stats:');
        this._logDsiplay.drawText(1, 1, 'Log:');

    }


    getGameDisplay() {
        return this._gameDisplay;
    }

    getLogDisplay() {
        return this._logDsiplay;
    }

    getStatsDisplay() {
        return this._statDisplay;
    }


    switchScreen(screen) {
        if(this._screens[screen] !== undefined && this._screens[screen] !== null) {
            if(this._currentScreen !== null) {
                this._currentScreen.exit();
            }
            this._gameDisplay.clear();
            this._currentScreen = this._screens[screen];
            this._currentScreen.enter();
            this._currentScreen.render(this._gameDisplay);
        }
        else {
            throw new Error('No such screen: ' + screen);
        }
    }
}

export default Game;