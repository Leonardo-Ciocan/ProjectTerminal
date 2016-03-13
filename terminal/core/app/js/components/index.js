let Prompt = require("./Prompt.js");
var ipc = window.require('ipc');
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import FlatButton from 'material-ui/lib/flat-button';
import Toggle from 'material-ui/lib/toggle';


 const theme =  {
    fontFamily: 'Helvetica, sans-serif',
    palette: {
        primary1Color: "transparent",
        primary2Color: "dodgerblue",
        primary3Color: "dodgerblue",
        accent1Color: "dodgetblue",
        textColor: "black",
        alternateTextColor: "dodgetblue",
        canvasColor: "white",
        borderColor: "transparent",
        disabledColor: "gray",
    }
};

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        background:"white"
    },
};

let promptID = 0;




module.exports = React.createClass({
  getInitialState () {
    return {
        prompts : [
            {
                id:0 , text:"hello" , output:{type:"text",data:""}
            }
        ],
        shortcuts :[
            {from:"fmail" , to:"leonardo.ciocan@outlook.com"},
            {from:"bituser" , to:"myUsername7253"},
            {from:"allprocs" , to:"ps aux"},
        ],
        evariables:[],
        permissions : [
            {name:"history" , restricted : false},
            {name:"insta" , restricted : false},
            {name:"not-a-virus.mp3" , restricted : true}
        ]
    }
  },
    childContextTypes : {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(theme),
        };
    },
  render () {
    let prompts = this.state.prompts.map((i) => <Prompt shortcuts={this.state.shortcuts} key={i.id} id={i.id} output={i.output} onClear={this.clearPrompt} onEnter={this.addPrompt}/>);

      let topShade = {
        height:"30px", background:"white",
          position:"fixed",top:"0px",left:"0px",right:"0px",borderBottom:"1px solid lightgray"
      };

      let sideBar = {
          width:"280px",
          borderLeft:"1px solid lightgray",
          position:"fixed",
          right:"0px",top:"30px",bottom:"0px",
          padding:"10px",
          paddingLeft:"5px",
          paddingRight:"15px",
          zIndex:"999",
          background:"white"
      };

      let inputStyle = {
          padding:"3px",
          margin:"3px"
      };

    let shortcuts = this.state.shortcuts.map((shortcut)=>{
        return <tr>
            <td>
                <input style={inputStyle} defaultValue={shortcut.from}/>
            </td>
            <td>
                <input style={inputStyle} defaultValue={shortcut.to}/>
            </td>
        </tr>;
    });

      let evariables = this.state.evariables.map((shortcut)=>{
          return <tr>
              <td>
                  <input style={inputStyle} defaultValue={shortcut.from}/>
              </td>
              <td>
                  <input style={inputStyle} defaultValue={shortcut.to}/>
              </td>
          </tr>;
      });

      const toggleStyle = {
          block: {
              maxWidth: 250,
          },
          toggle: {
              marginBottom: 16,marginLeft: 16,marginRight: 16
          },
      };

      let permission = this.state.permissions.map((permission)=>{
         return <div>
                 <Toggle style={toggleStyle.toggle} label={permission.name} defaultToggled={permission.restricted}/>
            </div>
      });

    return (
      <div style={{marginTop:"40px",marginRight:"280px"}}>
        {prompts}
          <div style={topShade}>
            <span style={{fontFamily:"Helvetica",lineHeight:"30px",verticalAlign:"middle",color:"gray" , display:"block",textAlign:"center"}}>Termy</span>
          </div>

          <div style={sideBar}>
              <Tabs>
                  <Tab label="Shortcuts" >
                      <div>
                         <table>
                             <thead>
                                <tr style={{textAlign:"center"}}>
                                    <td>From</td>
                                    <td>To</td>
                                </tr>
                             </thead>
                             <tbody>
                             {shortcuts}
                             </tbody>
                         </table>
                          <FlatButton onClick={this.newShortcut} style={{width:"100%"}} label="New shortcut" primary={false} />
                      </div>
                  </Tab>
                  <Tab label="eVariables" >
                          <div style={{overflow:"hidden",height:"100%"}}>
                              <table>
                              <thead>
                              <tr style={{textAlign:"center"}}>
                                  <td>Name</td>
                                  <td>Value</td>
                              </tr>
                              </thead>
                              <tbody>
                              {evariables}
                              </tbody>
                          </table>
                      </div>
                  </Tab>
                  <Tab
                      label="Permissions"
                      route="/home"
                  >
                      <div>
                          {permission}
                      </div>
                  </Tab>
              </Tabs>
          </div>
      </div>
    )
  },
    newShortcut(){
        this.state.shortcuts.push({from:"from" , to:"to"});
        this.setState({});
    },
    addPrompt:function(){
        promptID+=1;
        this.state.prompts.push({id:promptID  , text:""});
        this.setState({});
    },
    componentDidMount : function(){
        ipc.on("output" , function(msg){
           console.log(msg);
            this.state.prompts.filter((x)=>x.id==msg.id)[0].output = msg.content;
            this.setState({});
        }.bind(this));

        ipc.on("envs" , function(msg){
            let data = msg.split("\n").map((item)=> {
                return {"from":item.split("=")[0] , to:item.split("=")[1]}
            });
            console.log(data);
            this.setState({evariables:data});
        }.bind(this));
    },
    clearPrompt:function(){
        promptID += 1;
        this.setState({prompts:[]});
        this.setState({prompts:[{
            id: promptID, text:"hello" , output:{type:"text",data:""}
        }]});
    }
});
