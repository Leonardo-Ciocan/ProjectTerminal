var sys = require('sys');
var exec = require('child_process').exec;
var core = require("../core.js");
var ipc = window.require("ipc");

module.exports = React.createClass({
    getDefaultProps(){
      return {
          onEnter : function(){},
          output : {type:"text",data:""}
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
            fontSize:"11pt",
            lineHeight:"40px",
            verticalAlign:"center",
            width:"300px"
        };

        let promptStyle = {
            background:"dodgerblue",
            color:"white",
            display:"inline-block",
            height:"40px",
            paddingLeft:"10px",
            paddingRight:"10px"
        };

        let cardStyle = {
            display:"inline-block",
            width:"200px",
            padding:"10px",
            border:"1px solid lightgray",
            margin:"5px",
            borderRadius:"5px"
        };

        let labelStyle={
            fontSize:"13pt",
            display:"block",
            color:"Gray",
            fontFamily:"Helvetica",
            fontWeight:"200",
            padding:"5px",
            marginTop:"8px"
        };

        let contentLabelStyle = {
            fontSize:"13pt",
            fontWeight:"200",
            fontFamily:"Helvetica",
            padding:"5px"
        };



        var output;
        if(this.props.output.type != "text"){
            if(this.props.output.type == "list"){
                var items = this.props.output.data.map((data,index)=>{
                   let rows = data.map((item,rowIndex)=>{
                     return <div>
                                <span style={labelStyle}>{this.props.output.schema[rowIndex].label}</span>
                                <span style={contentLabelStyle}>{this.props.output.data[index][rowIndex]}</span>
                            </div>
                   });
                    return <div style={cardStyle}>{rows}</div>;
                });

                output = items;
            }
        }
        else{
            console.log("catched");
            let inner = this.props.output.data.replace(/\n/g, "<br />");
            output = <div style={{whiteSpace:"no-wrap",paddingLeft:"20px",fontFamily:"consolas",fontSize:"10pt"}} dangerouslySetInnerHTML={{__html:inner}}></div>
        }

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
                <div></div>
                {output}
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