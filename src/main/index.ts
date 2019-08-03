import {
  app,
  BrowserWindow,
  screen,
  net,
  protocol,
  Menu,
  MenuItem
} from "electron";
import * as path from "path";
import * as url from "url";
const pkg = require("@/../../package.json");
const settings = require("electron-settings");
const server = require("electron-serve");
const openAboutWindow = require("about-window").default;
const openHelpWindow = require("./help").default;
declare const __static: string;

let window, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

serve = process.env.hasOwnProperty("ELECTRON_WEBPACK_WDS_PORT");

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // const net = require("net");
  // Create the browser window.
  window = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 570,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  const menu = Menu.getApplicationMenu();

  // menu.append(
  //   new MenuItem({
  //     label: "MenuItem1",
  //     click() {
  //       console.log("item 1 clicked");
  //     }
  //   })
  // );

  // console.log(menu["commandsMap"][31]["submenu"]["commandsMap"]);

  menu["commandsMap"][31]["submenu"]["commandsMap"][28].click = () => {
    openHelpWindow({
      icon_path: "path/to/icon.png",
      homepage: pkg.homepage,
      bug_page: pkg.homepage + "/issues"
    });
  };

  menu["commandsMap"][31]["submenu"]["commandsMap"][30].click = async () => {
    const { shell } = require("electron");
    await shell.openExternal("https://github.com/s-ayers/OpenLotR2/issues");
  };

  menu["commandsMap"][31]["submenu"].append(
    new MenuItem({ type: "separator" })
  );

  menu["commandsMap"][31]["submenu"].append(
    new MenuItem({
      label: "About OpenLotR2",
      click() {
        openAboutWindow({
          icon_path: "path/to/icon.png",
          homepage: pkg.homepage,
          bug_page: pkg.homepage + "/issues"
        });
      }
    })
  );

  Menu.setApplicationMenu(menu);

  // protocol.interceptFileProtocol(
  //   "file",
  //   (request, callback) => {
  //     const url = request.url.substr(7); /* all urls start with 'file://' */
  //     callback(path.normalize(`${__dirname}/${url}`));
  //   },
  //   err => {
  //     if (err) console.error("Failed to register protocol");
  //   }
  // );

  // console.log(process.env.ELECTRON_WEBPACK_WDS_PORT);

  if (serve) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL("file://" + __dirname + "/index.html");
  }

  if (serve) {
    window.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  window.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => {
    createWindow();
  });

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
