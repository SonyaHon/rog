/*
     This is a global map, randomly generates when new game starts.
     It defines [][] of chunks. Each chunk will be generated when user will come to it
     It Stores data about all visited chunks (freezes everything in the chunk on leave)
     Map size is defined by screen size

     Each chunk contains of (type for localMap, data (null if not visited) and glyph based on type)

     Types:
        - flat

 */

import Glyph from './Glyph';
import ROT from 'rot-js';
import LocalMap from './LocalMap';

let hash = {
    flat: new Glyph({
        char: '.',
        foreground: '#754',
        background: '#523617'
    })
};

class GlobalMap {
    constructor() {
        this._map = [];

        for(let i = 0; i < ROT.DEFAULT_WIDTH; i++) {
            this._map.push([]);
            for(let j = 0; j < ROT.DEFAULT_HEIGHT; j++) {
                this._map[i].push({type: 'flat', data: null, glyph: hash.flat});
            }
        }
    }

    getLocalMap(x, y) {
        if(this._map[x][y].data !== null) {
            return LocalMap.fromData(this._map[x][y], x, y, this._map[x][y].type);
        }
        else {
            return new LocalMap(x, y, this._map[x][y].type);
        }
    }

    getStartingLocation() {
        let x = Math.floor(Math.random() * ROT.DEFAULT_WIDTH - 1);
        let y = Math.floor(Math.random() * ROT.DEFAULT_HEIGHT - 1);
        return {x: x, y: y};
    }

    saveState(obj) {
        this._map[obj.x][obj.y].data = obj.data;
    }

}

export default GlobalMap;