if (process.versions.hasOwnProperty("electron")) {
  // Electron specific code

  function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      title: "Open LotR2",
      width: 670,
      height: 530,

      icon: __dirname + "/www/favicon.ico",
      webPreferences: {
        nodeIntegration: true
      }
    });
    mainWindow.setMenu(null);
    // and load the index.html of the app.
    mainWindow.loadFile(__dirname + "www/index.html");
    console.log("build/index.html");
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on("closed", function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  }

  // Modules to control application life and create native browser window
  const { app, BrowserWindow } = require("electron");

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.

  let mainWindow;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
} else {
  players = {};
  const express = require("express");
  const app = express();
  const server = require("http").Server(app);
  const io = require("socket.io")(server, { wsEngine: "ws" });

  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");

  const wpConfig = require("../webpack.config.js");
  const compiler = webpack(wpConfig);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: wpConfig.output.publicPath
    })
  );

  const config = require(`${__dirname}/openlotr2.json`);

  console.log(config);
  const port = config.port || 3000;

  server.listen(port);
  console.log("Listening on http://localhost:" + port);
  // app.use(express.static(__dirname + '/www', { index: 'index.html' }));
  app.use("/assets", express.static(__dirname + "/www/assets"));
  // app.use( express.static('build'));

  io.on("connection", function(socket) {
    console.log("a user connected");
    // create a new player and add it to our players object
    players[socket.id] = {
      rotation: 0,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: socket.id,
      team: Math.floor(Math.random() * 2) == 0 ? "red" : "blue"
    };
    // send the players object to the new player
    socket.emit("currentPlayers", players);
    // update all other players of the new player
    socket.broadcast.emit("newPlayer", players[socket.id]);

    // when a player disconnects, remove them from our players object
    socket.on("disconnect", function() {
      console.log("user disconnected");
      // remove this player from our players object
      delete players[socket.id];
      // emit a message to all players to remove this player
      io.emit("disconnect", socket.id);
    });
  });
}
