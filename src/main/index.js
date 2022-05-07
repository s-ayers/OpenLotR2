"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var pkg = require("@/../../package.json");
var settings = require("electron-settings");
var server = require("electron-serve");
var openAboutWindow = require("about-window").default;
var openHelpWindow = require("./help").default;
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === "--serve"; });
function createWindow() {
    var _this = this;
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // const net = require("net");
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: 1000,
        height: 570,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });
    var menu = electron_1.Menu.getApplicationMenu();
    // menu.append(
    //   new MenuItem({
    //     label: "MenuItem1",
    //     click() {
    //       console.log("item 1 clicked");
    //     }
    //   })
    // );
    // console.log(menu["commandsMap"][31]["submenu"]["commandsMap"]);
    menu["commandsMap"][31]["submenu"]["commandsMap"][28].click = function () {
        openHelpWindow({
            icon_path: "path/to/icon.png",
            homepage: pkg.homepage,
            bug_page: pkg.homepage + "/issues"
        });
    };
    menu["commandsMap"][31]["submenu"]["commandsMap"][30].click = function () { return __awaiter(_this, void 0, void 0, function () {
        var shell;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shell = require("electron").shell;
                    return [4 /*yield*/, shell.openExternal("https://github.com/s-ayers/OpenLotR2/issues")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    menu["commandsMap"][31]["submenu"].append(new electron_1.MenuItem({ type: "separator" }));
    menu["commandsMap"][31]["submenu"].append(new electron_1.MenuItem({
        label: "About OpenLotR2",
        click: function () {
            openAboutWindow({
                icon_path: "path/to/icon.png",
                homepage: pkg.homepage,
                bug_page: pkg.homepage + "/issues"
            });
        }
    }));
    electron_1.Menu.setApplicationMenu(menu);
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
    console.log("http://localhost:" + process.env.ELECTRON_WEBPACK_WDS_PORT);
    if (true || serve) {
        // const loadURL = server({ directory: "renderer" });
        // loadURL(win);
        // require("electron-reload")(__dirname, {
        //   electron: require(`${__dirname}/../../node_modules/electron`)
        // });
        win.loadURL("http://localhost:" + process.env.ELECTRON_WEBPACK_WDS_PORT);
        // win.loadURL("app://-");
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, "../rendered/index.html"),
            protocol: "file:",
            slashes: true
        }));
    }
    if (true || serve) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on("closed", function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on("ready", function () {
        createWindow();
    });
    // Quit when all windows are closed.
    electron_1.app.on("window-all-closed", function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
    electron_1.app.on("activate", function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=index.js.map