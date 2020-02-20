const { app, Menu, Tray } = require('electron')
const path = require('path')
const { exec } = require('child_process')

let tray = null

app.on('ready', () => {
  tray = new Tray(path.resolve(__dirname, 'wifi.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Wifi 1 ", type: 'radio', click() { changeSSID("Wifi 1") }
    },
    {
      label: "WiFi 2", type: 'radio', click() {changeSSID("Wifi 2")}
    },
    {
      label: "WiFi 3", type: 'radio', click() {changeSSID("Wifi 3")}
    }
  ])
  tray.setToolTip('Wifi switcher');
  tray.setContextMenu(contextMenu);

  function changeSSID(ssid) {
    command = "nmcli con up " + "'" + ssid + "'";
    executeBash(command);
  }
 
  function executeBash(command){
    console.log('command', command)
    return exec(command, function (err, stdout, stderr) {
      if (err) {
        console.log("Error connecting to " + ssid);
        console.log(stderr);
        
      }
      console.log(stdout);
    });

  }


})