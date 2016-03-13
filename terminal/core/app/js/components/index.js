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

console.log(process.env);

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

    return (
      <div style={{marginTop:"40px",marginRight:"280px"}}>
        {prompts}
          <div style={topShade}>

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
                      </div>
                  </Tab>
                  <Tab label="eVariables" >
                      <div>
                          <h2 style={styles.headline}>Tab Two</h2>
                          <p>
                              This is another example tab.
                          </p>
                      </div>
                  </Tab>
                  <Tab
                      label="Permissions"
                      route="/home"
                  >
                      <div>
                          <h2 style={styles.headline}>Tab Three</h2>
                          <p>
                              This is a third example tab.
                          </p>
                      </div>
                  </Tab>
              </Tabs>
          </div>
      </div>
    )
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
    },
    clearPrompt:function(){
        promptID += 1;
        this.setState({prompts:[]});
        this.setState({prompts:[{
            id: promptID, text:"hello" , output:{type:"text",data:""}
        }]});
    }
});
