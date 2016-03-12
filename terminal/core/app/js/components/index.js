let Prompt = require("./Prompt.js");
var ipc = window.require('ipc');

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
    let prompts = this.state.prompts.map((i) => <Prompt id={i.id} output={i.output} onClear={this.clearPrompt} onEnter={this.addPrompt}/>);

      let topShade = {
        height:"30px", background:"white",
          position:"fixed",top:"0px",left:"0px",right:"0px",borderBottom:"1px solid lightgray"
      };

    return (
      <div style={{marginTop:"40px"}}>
        {prompts}
          <div style={topShade}>

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
