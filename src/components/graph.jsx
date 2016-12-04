import React from 'react';
import ReactDOM from 'react-dom';

import * as d3 from "d3";
import Faux from 'react-faux-dom';

class Graph extends React.Component {
  render(){
    return (
      <div className="graph-container">
        <h1>Graph</h1>
        <MyReactClass data={this.props.data}></MyReactClass>
      </div>
    );
  }
}

class Chart extends React.Component {
  componentDidMount(){
    console.log("chart mounted 🔥");
    console.log(d3);
  }
  render(){
    return (
      <div>
      <div className="chart"></div>

      </div>
    )
  }
}

const MyReactClass = React.createClass({
  mixins: [
    Faux.mixins.core,
    Faux.mixins.anim
  ],

  getInitialState () {
    return {
      chart: 'loading...'
    }
  },

  render () {
    var scores = [];

    // test values
    let satScore = [];
    let gpa = 3;
    // Default value
    // let satScore = 0;
    // let gpa = 0;

    this.props.data.forEach((answer) => {
      switch (answer.id) {
        case "sat-score":
            // satScore = parseInt(answer.value[0]) + parseInt(answer.value[1]);
            satScore.push(parseInt(answer.value[0]) + parseInt(answer.value[1]));
          break;
        case "gpa":
            gpa = answer.value[0];
        default:
          console.log('error');
      }
    });

    var dataset = [];
    satScore.forEach((score) => {
      console.log(score);
      dataset.push([score, gpa]);
    });
    // var dataset = [ [satScore[0], gpa], [satScore[1], gpa] ];

    // console.log(scores);
    var node = Faux.createElement('svg');

    // http://alignedleft.com/tutorials/d3/making-a-bar-chart
    var w = 500;
    var h = 300;
    var barPadding = 1;
    var padding = 20;

    var svg = d3.select(node)
      .attr("width", w)
      .attr("height", h);

    var xScale = d3.scaleLinear()
       .domain([0, 1600])
       .range([padding, w - padding * 2 ]);

    var xAxis = d3.axisBottom(xScale).ticks(8);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    var yScale = d3.scaleLinear()
        // .domain([0, d3.max(dataset, function(d) { return d[1]; })])
        .domain([0, 4])
        .range([h - padding, padding]);

    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    var rScale = d3.scaleLinear()
       .domain([0, d3.max(dataset, function(d) { return d[1]; })])
       .range([2, 5]);

    svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
          return xScale(d[0]);
      })
      .attr("cy", function(d) {
          return yScale(d[1]);
      })
      // .attr("r", 5);
      .attr("r", function(d) {
          // return Math.sqrt(h - d[1]);
          return rScale(d[1]);
      });

    // svg.selectAll("text")
    //   .data(dataset)
    //   .enter()
    //   .append("text")
    //   .text(function(d) {
    //     return d[0] + "," + d[1];
    //   })
    //   .attr("x", function(d) {
    //      return xScale(d[0]);
    //   })
    //   .attr("y", function(d) {
    //        return yScale(d[1]);
    //   })
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", "11px")
    //   .attr("fill", "red");

    return node.toReact();
  }
})

export default Graph;
