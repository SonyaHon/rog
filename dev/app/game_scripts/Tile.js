class Tile {
    constructor(glyph) {
        this._glyph = glyph;
    }

    get glyph() {
        return this._glyph;
    }
}

export default Tile;