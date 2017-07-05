import ROT from 'rot-js';

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
                    debugger;
                    game.switchScreen('playScreen');
                }
            }
        }
    },
    // Playing screen
    playScreen: {
        enter: function() {
            console.log('entered playing screen');
        },
        exit: function() {
            console.log('exited playing screen');
        },
        render: function(display) {
            display.drawText(3,5, "%c{red}%b{white}This game is so much fun!");
            display.drawText(4,6, "Press [Enter] to win, or [Esc] to lose!");
        },
        handleInput: function(inputType, inputData, Game) {
            if (inputType === 'keydown') {
                if (inputData.keyCode === ROT.VK_RETURN) {
                    Game.switchScreen('winScreen');
                }
                else if (inputData.keyCode === ROT.VK_ESCAPE) {
                    Game.switchScreen('loseScreen');
                }
            }
        }
    }
}