

if (process.versions.hasOwnProperty('electron')) {
  // Electron specific code

  function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      title: "Open LotR2",
      width: 670,
      height: 530,

      icon: __dirname + '/www/favicon.ico',
      webPreferences: {
        nodeIntegration: true
      }
    })
    mainWindow.setMenu(null);
    // and load the index.html of the app.
    mainWindow.loadFile(__dirname + '/www/index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

  
  // Modules to control application life and create native browser window
  const { app, BrowserWindow } = require('electron')

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.


  let mainWindow;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

} else {

  const express = require('express')
  const app = express()
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  const port = 3000


  server.listen(port);
  console.log('Listening on http://localhost:3000');
  app.use(express.static(__dirname + '\\www', { index: 'index.html' }));

  io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');

    io.emit('this', { will: 'be received by everyone' });

    socket.on('private message', function (from, msg) {
      console.log('I received a private message by ', from, ' sayinxg ', msg);
    });

    socket.on('disconnect', function () {
      io.emit('user disconnected');
    });
  });

}
