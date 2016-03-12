let Prompt = require("./Prompt.js");
var ipc = window.require('ipc');
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        background:"white"
    },
};

module.exports = React.createClass({
  getInitialState () {
    return {
        prompts : [
            {
                id:0 , text:"hello" , output:{type:"text",data:""}
            }
        ]
    }
  },
  render () {
    let prompts = this.state.prompts.map((i) => <Prompt key={i.id} id={i.id} output={i.output} onClear={this.clearPrompt} onEnter={this.addPrompt}/>);

      let topShade = {
        height:"30px", background:"white",
          position:"fixed",top:"0px",left:"0px",right:"0px",borderBottom:"1px solid lightgray"
      };

      let sideBar = {
          width:"230px",
          borderLeft:"1px solid lightgray",
          position:"fixed",
          right:"0px",top:"30px",bottom:"0px"
      };


    return (
      <div style={{marginTop:"40px",marginRight:"230px"}}>
        {prompts}
          <div style={topShade}>

          </div>

          <div style={sideBar}>

          </div>
      </div>
    )
  },
    addPrompt:function(){
        this.state.prompts.push({id:this.state.prompts.length  , text:""});
        this.setState({});
    },
    componentDidMount : function(){
        ipc.on("output" , function(msg){
           console.log(msg);
            this.state.prompts[msg.id].output = msg.content;
            this.setState({});
        }.bind(this));
    },
    clearPrompt:function(){
        this.setState({prompts:[]});
        this.setState({prompts:[{
            id: 0, text:"hello" , output:{type:"text",data:""}
        }]});
    }
});
