class Glyph {
    constructor(props) {
        this._char = props['char'] || ' ';
        this._foreground = props['foreground'] || 'white';
        this._background = props['background'] || 'black';
    }

    get char() {
        return this._char;
    }

    get foreground() {
        return this._foreground;
    }

    get background() {
        return this._background;
    }

    static isNull(glyph) {
        return (glyph.char === ' ' && glyph.background === 'black' && glyph.foreground === 'white');
    }
}

export default Glyph;