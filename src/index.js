import { app, BrowserWindow } from 'electron';
import fs  from 'fs';
import StaticServer from 'static-server';
import colors from 'colors';
import path from 'path';

console.log(' Starting...'.green);

// Read config
console.log(' Reading'.green,  'config.json'.cyan ,  '...'.green);
let config = JSON.parse(fs.readFileSync(path.join(__dirname, '/server/config.json')).toString());

// Start server
console.log(' Starting server...'.green);
let mainWindow;
let server = new StaticServer({
    port: config['server-port'],
    rootPath: `${__dirname}/server/`
});

server.on('request', (req) => {
    if(req.path === "/exit_game") {
        app.quit();
    }
    if(req.path === "/set_config") {
        let newConfig = {};
        let obj = req.url;
        obj = obj.split('?')[1];
        obj = obj.split('&');
        for(let key in obj) {
            let name = obj[key].split('=')[0];
            let val  = obj[key].split('=')[1];
            if(val)
                newConfig[name] = val;
        }

        let buff = Buffer.from(JSON.stringify(newConfig));
        fs.writeFile(path.join(__dirname, './server/config.json'), buff, function (err) {
            console.log(err);
        });
    }
});

server.start(() => {
    console.log(' Server started on'.green, colors.cyan(server.port), 'port'.green);

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });

});

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: parseInt(config['screen-width']),
        height: parseInt(config['screen-height']),
    });

    mainWindow.loadURL(`http://127.0.0.1:` + server.port + '/');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

