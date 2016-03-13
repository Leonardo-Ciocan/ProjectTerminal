'use strict';

var electron = require('electron');
// Module to control application life.
var app = electron.app;
// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;

var path = require('path');

var ipc = require("ipc");
ipc.on("hello", function (event, msg) {
  console.log("browser side: " + msg);
});

var currentFolder = "";
var exec = require("child_process").exec;
function puts(error, stdout, stderr) {
  currentFolder = stdout;
}
exec("pwd", puts);
var mainWindow = void 0;

ipc.on("exec-command", function (event, msg) {
  function puts(error, stdout, stderr) {
    console.log(stderr);

    try {
      var json = JSON.parse(stdout);
      mainWindow.send("output", { id: msg.id, content: json });
    } catch (e) {
      mainWindow.send("output", { id: msg.id, content: { type: "text", data: stdout } });
    }
  }
  exec(msg.content, { env: { "NODE_PATH": process.env.NODE_PATH } }, puts);
});

//ipc.sendChannel('location-changed', "/core/");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

var createWindow = function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, 'titleBarStyle': 'hidden' });

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on("did-finish-load", function () {
    mainWindow.send("location-changed", currentFolder);
  });
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

console.log(require("child_process"));
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});