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
        enter: function() {
            console.log('entered playing screen');

            let map = [];
            for(let x = 0; x < ROT.DEFAULT_WIDTH; x++) {
                map.push([]);
                for(let y = 0; y < ROT.DEFAULT_HEIGHT; y++) {
                    map[x].push(new Tile(null));
                }
            }

            let generator = new ROT.Map.Cellular(ROT.DEFAULT_WIDTH, ROT.DEFAULT_HEIGHT);
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
           for(let x = 0; x < this._map.width; x++) {
               for(let y = 0; y < this._map.height; y++) {
                   let glyph = this._map.getTile(x, y).glyph;
                   display.draw(x, y, glyph.char, glyph.foreground, glyph.background);
               }
           }
        },
        handleInput: function(inputType, inputData, game) {
            if (inputType === 'keydown') {
                if (inputData.keyCode === ROT.VK_RETURN) {
                    game.switchScreen('winScreen');
                }
                else if (inputData.keyCode === ROT.VK_ESCAPE) {
                    game.switchScreen('loseScreen');
                }
            }
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