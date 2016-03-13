const ReactDOM = require('react-dom')
const React = require('react')

window.React = React

let Index = require('./components/index.js');
let prompt = require('./components/Prompt.js');

let core = require("./core.js");

//const exec = require('child_process');
//
//function puts(error, stdout, stderr) { core.currentFolder = stdout }
//console.log(exec)
//exec("pwd", puts);

//var ipc = window.require('ipc');
//
//ipc.on("location-changed",function(){
//    console.log("locataiton changed");
//});

google.charts.load('current', {'packages':['corechart']});

var ipc = window.require('ipc');


ipc.on("location-changed",function(msg){
   core.currentFolder = msg;
    ReactDOM.render(
        <Index />,
        document.getElementById('content')
    );
});

