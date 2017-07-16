import ROT from 'rot-js';
import GlobalMap from './GlobalMap';
import EventEmitter from 'events';

class Game {
    constructor(width, height) {
        ROT.DEFAULT_WIDTH = width;
        ROT.DEFAULT_HEIGHT = height;
        this._display = new ROT.Display({
            width: width,
            height: height
        });

        ROT._eventEmitter = new EventEmitter();

        window.addEventListener('keydown', function (event) {
            ROT._eventEmitter.emit('keydown', event.keyCode);
        }.bind(this));

        window.addEventListener('keyup', function (event) {
            ROT._eventEmitter.emit('keyup', event.keyCode);
        }.bind(this));

        this._globalMap = new GlobalMap();
        let startPoint = this._globalMap.getStartingLocation();
        this._currentLocalMap = this._globalMap.getLocalMap(startPoint.x, startPoint.y);

        ROT.GAME = this;
    }

    drawTile(tile) {
        this._display.draw(tile.x, tile.y, tile.glyph.char, tile.glyph.foreground, tile.glyph.background);
    }

    drawGlyph(x, y, glyph) {
        this._display.draw(x, y, glyph.char, glyph.foreground, glyph.background);
    }

    renderCurrentMap() {
        this.clear();
        for(let x = 0; x < ROT.DEFAULT_WIDTH; x++) {
            for(let y = 0; y < ROT.DEFAULT_HEIGHT; y++) {
                this.drawTile(this._currentLocalMap.getTileAt(x, y));
            }
        }
    }

    clear() {
        this._display.clear();
    }

    get display() {
        return this._display;
    }

    changeCurrentLocalMap(newMapX, newMapY) {
        // save current map
        this._globalMap.saveState(this._currentLocalMap.data);
        // Change current map
        this._currentLocalMap = this._globalMap.getLocalMap(newMapX, newMapY);
    }
}

export default Game;