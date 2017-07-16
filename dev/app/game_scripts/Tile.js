import Glyph from './Glyph';

class Tile {
    constructor(props) {
        this._baseGlyph = props['glyph'] || new Glyph({});
        this._x = props['x'] || 0;
        this._y = props['y'] || 0;

       this._gameObjects = [];
    }

    get glyph() {
        if(this._gameObjects.length > 0) {
            for(let i = 0; i < this._gameObjects.length; i++) {
                if(!Glyph.isNull(this._gameObjects[i].glyph))
                    return this._gameObjects[i].glyph;
            }
        }
        return this._baseGlyph;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // Base tiles
    static Null(x, y) {
        return new Tile({x: x, y: y, glyph: new Glyph({
            char: '.',
            foreground: '#666'
        })});
    }
}

export default Tile;