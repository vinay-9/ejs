// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }

// const createWindow = () => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//   });

//   // and load the index.html of the app.
//   mainWindow.loadFile(path.join(__dirname, 'index.html'));

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();
// };

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });


// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and import them here.
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const express =require('express');

const server =require('../backend/app');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
const createWindow = () => {
 
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL('http://localhost:5000/');
 // app.set('views', __dirname + '/client/views');
  // app.use(express.static(__dirname + '/backend/app'));
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// function getIt(){
//   const fetchedUser={};
//   axios.get("https://jsonplaceholder.typicode.com/todos").
//     then((res)=>{
//        fetchedUser =res.map(user=>{
//        return (user.Title,user.Completed);
//      });
//   })
//   .catch(err=> console.log(err));

  
//   ipcMain.on("signup",function(){
//     axios.post("https://jsonplaceholder.typicode.com/todos",fetchedUser)
//     .then(res=>{
//       console.log(res);
//     })
//     .catch(err=>console.log("error in posting "))
//   })
// }
