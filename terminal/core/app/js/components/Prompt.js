var sys = require('sys');
var exec = require('child_process').exec;
var core = require("../core.js");
var ipc = window.require("ipc");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
    getDefaultProps(){
      return {
          onEnter : function(){},
          onClear : function(){},
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
            width:"250px"
        };

        let promptStyle = {
            background:"white",
            color:"dodgerblue",
            display:"inline-block",
            height:"40px",
            paddingLeft:"10px",
            paddingRight:"10px",
            borderRight:"1px solid lightgray"
        };

        let cardStyle = {
            display:"inline-block",
            width:"200px",
            padding:"10px",
            border:"1px solid lightgray",
            margin:"5px",
            borderRadius:"5px",
            overflow:"hidden",
            verticalAlign:"top"
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
            fontSize:"11.5pt",
            fontWeight:"200",
            fontFamily:"Helvetica",
            padding:"5px",
            whiteSpace:"normal",
            overflow:"hidden",
            display:"inline-block"
        };

        let sideBar = {
          width:"300px",
            borderLeft:"1px solid lightgray",
            position:"fixed",
            right:"0px",top:"0px",bottom:"0px"
        };

        let filterHolder = <div></div>;
        if(this.props.output.type == "list") {
            let filters = this.props.output.schema.map((item,index)=> {
                return item.label == "" ? <span/> :
                    <span
                        onClick={()=>this.sortBy(index)}
                        style={{cursor:"pointer",padding:"7px" ,color:"dodgerblue",margin:"3px",fontFamily:"Helvetica"}}>
                        {item.label}
                    </span>
            });

            filterHolder = <div style={{fontFamily:"Helvetica!important",padding:"10px"}}>
                    Sort by : {filters}
                </div>;
        }

        var output;

            if(this.props.output.type == "list"){
                var items = this.props.output.data.map((data,index)=>{
                    console.log(data);
                   let rows = data.map((item,rowIndex)=>{
                       var card;
                       if(this.props.output.schema[rowIndex].type == "image"){
                           card = <div style={{
                                marginLeft:"-10px",marginTop:"-10px",marginRight:"0px",
                                width:"222px",height:"130px",
                                borderBottom:"1px solid lightgray",
                                background:"url("+this.props.output.data[index][rowIndex]+") no-repeat center center",
                                backgroundRepeat:"no-repeat",
                                backgroundSize:"cover"
                           }} ></div>;
                       }else{
                           card = <div>
                                       <span style={labelStyle}>{this.props.output.schema[rowIndex].label}</span>
                                       <span style={contentLabelStyle}>{this.props.output.data[index][rowIndex].substring(0,100)}</span>
                                  </div>
                       }

                     return card;
                   });
                    return <div style={cardStyle}>{rows}</div>;
                });

                output =
                    <div style={{overflow:"scroll",overflowY:"hidden" , "whiteSpace":"nowrap"}}>
                            {items}
                    </div>;
            }

        else if (this.props.output.type == "text"){
            console.log("catched");
            let inner = this.props.output.data.replace(/\n/g, "<br />");
            output = <div style={{whiteSpace:"no-wrap",paddingLeft:"20px",fontFamily:"consolas",fontSize:"10pt"}} dangerouslySetInnerHTML={{__html:inner}}></div>
        }
        else if (this.props.output.type == "tabular/single") {
                //google.charts.setOnLoadCallback(function(){
                //
                //    //output = chart;
                //}.bind(this));

                console.log("DRAWING");
                var data = [["Times used today","Value"]];
                for(var i = 0; i < this.props.output.data.length;i++){
                    data.push([this.props.output.data[i].label , this.props.output.data[i].value]);
                }

                console.log(this.props);

                var dv = <div></div>;
                var cdata = google.visualization.arrayToDataTable(data);
                var chart = new google.visualization.BarChart(this.refs.outputHolder);
                chart.draw(cdata, {});
                chart.draw(cdata, {});
        }


        return (
            <div style={containerStyle}>
               <div style={promptStyle} >
                   <span style={{
                        fontFamily:"",
                        fontSize:"10pt",
                        lineHeight:"40px",
                        verticalAlign:"middle"
                   }}>{core.currentFolder.split("/").slice(-3).join(" • ")}</span>
               </div>
               <input ref="input" onKeyPress={this.keyPressed} style={inputStyle}/>
                <div></div>
                {filterHolder}
                <div></div>
                <div ref="outputHolder"></div>
                {output}

            </div>
        );
    },
    keyPressed:function(e){
        if (e.key === 'Enter') {
            if(e.target.value == "clear"){
                this.props.onClear();
                return;
            }
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
    },
    sortBy(index){
        this.props.output.data.sort(function (a, b) {
            if (a[index] > b[index]) {
                return 1;
            }
            if (a[index] < b[index]) {
                return -1;
            }
            return 0;
        });
        this.setState({});
    }
});