var sys = require('sys');
var exec = require('child_process').exec;
var core = require("../core.js");
var ipc = window.require("ipc");

module.exports = React.createClass({
    getDefaultProps(){
      return {
          onEnter : function(){}
      }
    },
    getInitialState () {
        return {
           content : ""
        }
    },
    render () {
        let containerStyle = {
            marginTop:"15px"
        };

        let inputStyle = {
            margin:"10px",
            border:"none",
            borderBottom:"1px solid lightgray",
            fontSize:"13pt",
            lineHeight:"40px",
            verticalAlign:"center"
        };

        let promptStyle = {
            background:"dodgerblue",
            color:"white",
            display:"inline-block",
            height:"40px",
            paddingLeft:"10px",
            paddingRight:"10px"
        };

        return (
            <div style={containerStyle}>
               <div style={promptStyle} >
                   <span style={{
                        fontSize:"10pt",
                        lineHeight:"40px",
                        verticalAlign:"middle"
                   }}>{core.currentFolder.split("/").slice(-3).join("/")}</span>
               </div>
               <input ref="input" onKeyPress={this.keyPressed} style={inputStyle}/>
                <span style={{display:"block",padding:"10px"}}>{this.props.output}</span>
            </div>
        );
    },
    keyPressed:function(e){
        if (e.key === 'Enter') {
            this.props.onEnter(e.target.value);
            e.target.disabled = true;
            this.setState({content : e.target.value});
            this.runCommand(e.target.value);
        }
    },
    componentDidMount(){
        this.refs.input.focus();
    },
    runCommand(txt){
        console.log("sending exec");
        ipc.send("exec-command" , {id:this.props.id , content: txt});
    }
});