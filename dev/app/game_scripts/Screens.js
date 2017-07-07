import ROT from 'rot-js';
import Tile from './Tile';
import Glyph from './Glyph';
import Map from './Map';

// Template for  screen
/*
    X: {
        enter: function() {
        },
        exit: function() {
        },
        render: function(display) {
        },
        handleInput: function(inputType, inputData, game) {
        }
    },
 */

export default {
    // Start screen. All preps done. Gonna Launch.
    startScreen: {
        enter: function () {
            console.log('Entered start screen');
        },
        exit: function () {
            console.log('exited start screen');
        },
        render: function (display) {
            display.drawText(1,1, "%c{yellow}Javascript Roguelike");
            display.drawText(1,2, "Press [Enter] to start!");
        },
        handleInput: function (inputType, inputData, game) {
            if (inputType === 'keydown') {
                if (inputData.keyCode === ROT.VK_RETURN) {
                    game.switchScreen('playScreen');
                }
            }
        }
    },
    // Playing screen
    playScreen: {
        _map: null,
        _centerX: 0,
        _centerY: 0,
        map_width: 500,
        map_height: 500,
        enter: function() {
            console.log('entered playing screen');

            let map = [];

            for(let x = 0; x < this.map_width; x++) {
                map.push([]);
                for(let y = 0; y < this.map_height; y++) {
                    map[x].push(new Tile(null));
                }
            }

            let generator = new ROT.Map.Cellular(this.map_width, this.map_height);
            generator.randomize(0.5);

            for(let i = 0; i < 3; i++) {
                generator.create();
            }

            generator.create(function (x, y, v) {
                if(v === 1) {
                    map[x][y] = new Tile(new Glyph({
                        char: '.',
                        foreground: 'grey',
                        background: 'black'
                    }))
                }
                else {
                    map[x][y] = new Tile(new Glyph({
                        char: '#',
                        foreground: 'goldenrod',
                        background: 'black'
                    }))
                }
            });

            this._map = new Map(map);

        },
        exit: function() {
            console.log('exited playing screen');
        },
        render: function(display) {

            let scWidth = display.getOptions().width;
            let scHeight = display.getOptions().height;

            let topLeftX = Math.max(0, this._centerX - (scWidth / 2));
            let topLeftY = Math.max(0, this._centerY - (scHeight / 2));

            topLeftX = Math.min(topLeftX, this.map_width - scWidth);
            topLeftY = Math.min(topLeftY, this.map_height - scHeight);

           for(let x = topLeftX; x < topLeftX + scWidth ; x++) {
               for(let y = topLeftY; y < topLeftY + scHeight; y++) {
                   let glyph = this._map.getTile(x, y).glyph;
                   display.draw(x, y, glyph.char, glyph.foreground, glyph.background);
               }
           }

            display.draw(
                this._centerX - topLeftX,
                this._centerY - topLeftY,
                this._centerY - topLeftY,
                '@',
                'white',
                'black');
        },
        handleInput: function(inputType, inputData, game) {
            if (inputType === 'keydown') {
                if(inputData.keyCode === ROT.VK_DOWN) {
                    console.log('KEK');
                    this.move(0, 1);
                }
                else if(inputData.keyCode === ROT.VK_UP) {
                    this.move(0, -1);
                }
                else if(inputData.keyCode === ROT.VK_LEFT) {
                    this.move(-1, 0);
                }
                else if(inputData.keyCode === ROT.VK_RIGHT) {
                    this.move(1, 0);
                }

            }
        },
        // Custom funcs
        move: function (x, y) {
            this._centerX = Math.max(0, Math.min(this._map.width - 1, this._centerX + x));
            this._centerY = Math.max(0, Math.min(this._map.height - 1, this._centerY + y));
        }
    },

    winScreen: {
        enter: function() {    console.log("Entered win screen."); },
        exit: function() { console.log("Exited win screen."); },
        render: function(display) {
            // Render our prompt to the screen
            for (var i = 0; i < 22; i++) {
                // Generate random background colors
                var r = Math.round(Math.random() * 255);
                var g = Math.round(Math.random() * 255);
                var b = Math.round(Math.random() * 255);
                var background = ROT.Color.toRGB([r, g, b]);
                display.drawText(2, i + 1, "%b{" + background + "}You win!");
            }
        },
        handleInput: function(inputType, inputData) {
            // Nothing to do here
        }
    },
    loseScreen: {
        enter: function() {    console.log("Entered lose screen."); },
        exit: function() { console.log("Exited lose screen."); },
        render: function(display) {
            // Render our prompt to the screen
            for (var i = 0; i < 22; i++) {
                display.drawText(2, i + 1, "%b{red}You lose! :(");
            }
        },
        handleInput: function(inputType, inputData) {
            // Nothing to do here
        }
    }
}