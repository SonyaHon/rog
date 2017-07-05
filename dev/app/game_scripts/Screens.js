
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
        handleInput: function (inputType, inputData) {
            if (inputType === 'keydown') {
                if (inputData.keyCode === ROT.VK_RETURN) {
                    Game.switchScreen(Game.Screen.playScreen);
                }
            }
        }
    }
}