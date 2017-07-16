/*
    Generates local maps which have size of the screen and their content is defined by map type
    Also it can regenerate local map from data sent to it
 */

import Tile from './Tile';
import Glyph from './Glyph';
import ROT from 'rot-js';

class LocalMap {
    constructor(x, y, type) {
        this._x = x;
        this._y= y;
        this._type = type;
        this._data = {
            mapData: [],
            actorsData: null
        };

        //Generate some flat ground
        if(this._type === 'flat') {
            for(let i = 0; i < ROT.DEFAULT_WIDTH; i++) {
                this._data.mapData.push([]);
                for(let j = 0; j < ROT.DEFAULT_HEIGHT; j++) {
                    this._data.mapData[i].push(new Tile({
                        x: i,
                        y: j,
                        glyph: new Glyph({
                            char: '.',
                            foreground: '#555',
                        })
                    }))
                }
            }
        }
    }

    getTileAt(x, y) {
        if(x >= 0 && x < ROT.DEFAULT_WIDTH && y >= 0 && y < ROT.DEFAULT_HEIGHT) {
            return this._data.mapData[x][y];
        }
    }

    get data() {
        return {x: this._x, y: this._y, data: this._data};
    }

    static fromData(data, x, y, type) {
        let lm = new LocalMap(x, y, type);
        lm._data = data;
        return lm;
    }
}

export default LocalMap;