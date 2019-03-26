import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class StudentDeptChart extends Component {
    constructor(props){
      super(props);
      this.state = {
          loading: false,
          data : [],
          ececount : 0,
          eeecount : 0,
          csecount : 0,
          itcount : 0,
          mechcount : 0,
          deptgraphdata : [{
            "dept": "ECE",
            "total": 0
            }, 
            {
            "dept": "EEE",
            "total": 0
            },
            { 
            "dept": "IT",
            "total": 0
            }, 
            {
            "dept": "CSE",
            "total": 0
            },
            { 
            "dept": "MECH",
            "total": 0
          }]
      }
  }

  componentDidMount() {

    var ececnt=0,eeecnt=0,itcnt=0,csecnt=0,mechcnt=0;
    this.setState({loading:true})

        fetch('./data.json')
        .then(res1 => res1.json())
        .then(data1 => {
          data1.map((items,i) => {

          if(items.dept === "ECE"){
              ececnt++;
          }
          else if(items.dept === "EEE"){
              eeecnt++;
          }
          else if(items.dept === "IT"){
              itcnt++;
          }
          else if(items.dept === "CSE"){
              csecnt++;
          }    
          else if(items.dept === "MECH"){
              mechcnt++;
          }
          return data1
        })
      })
      .then((data2) =>{
        var stateCopy = Object.assign({}, this.state);
        stateCopy.deptgraphdata = stateCopy.deptgraphdata.slice();
        stateCopy.deptgraphdata[0] = Object.assign({}, stateCopy.deptgraphdata[0]);
        stateCopy.deptgraphdata[0].total = this.state.deptgraphdata[0].total + ececnt;
        stateCopy.deptgraphdata[1] = Object.assign({}, stateCopy.deptgraphdata[1]);
        stateCopy.deptgraphdata[1].total = this.state.deptgraphdata[1].total + eeecnt;
        stateCopy.deptgraphdata[2] = Object.assign({}, stateCopy.deptgraphdata[2]);
        stateCopy.deptgraphdata[2].total = this.state.deptgraphdata[2].total + itcnt;
        stateCopy.deptgraphdata[3] = Object.assign({}, stateCopy.deptgraphdata[3]);
        stateCopy.deptgraphdata[3].total = this.state.deptgraphdata[3].total + csecnt;
        stateCopy.deptgraphdata[4] = Object.assign({}, stateCopy.deptgraphdata[4]);
        stateCopy.deptgraphdata[4].total = this.state.deptgraphdata[4].total + mechcnt;
        stateCopy.data = Object.assign({}, stateCopy.data);
        stateCopy.data = data2;
        stateCopy.loading = Object.assign({}, stateCopy.loading);
        stateCopy.loading = false;
        this.setState(stateCopy);
      })

      .then(() =>{
        var chart = am4core.create("chartdiv2", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.state.deptgraphdata

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "dept";
        pieSeries.colors.step = 3;
        this.chart = chart;
      }

    )
  }

  render() {
    const graphfield = this.state.loading ? "" :  <div id="chartdiv2" style={{ width: "75%", height: "250px" }}></div>;
    return (
      <div>
         {graphfield}  
      </div> 
    );
  }
}

export default StudentDeptChart;