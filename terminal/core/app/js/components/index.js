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
    let prompts = this.state.prompts.map((i) => <Prompt id={i.id} output={i.output} onEnter={this.addPrompt}/>);

    return (
      <div>
        {prompts}
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
    }
});
