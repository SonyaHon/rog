import Glyph from './Glyph';
import Mixins from 'es6-mixins';

class GameObject {
    constructor(props, mixins) {
        this._glyph = props['glyph'] || new Glyph({});
        this._x = props['x'] || 0;
        this._y = props['y'] || 0;
        this._name = props['name'] || 'unknown object';
        Mixins(mixins, this);
        this.init();
    }

    get glyph() {
        return this._glyph;
    }
}

export default GameObject;