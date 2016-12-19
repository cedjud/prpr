import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Dimensions from 'react-dimensions';

import * as d3 from "d3";
import Faux from 'react-faux-dom';

class Graph extends React.Component {
  render(){
    return (
      <div className="graph-container">
        <h1>Graph</h1>
        {/* <MyReactClass data={this.props.data} schoolData={this.props.schoolData}></MyReactClass> */}
        <EnhancedComponent data={this.props.data} schoolData={this.props.schoolData}/>
      </div>
    );
  }
}

class MyComponent extends React.Component {
  // static propTypes = {
  //   containerWidth: PropTypes.number.isRequired,
  //   containerHeight: PropTypes.number.isRequired
  // }

  render () {
    return (
      <div style={{
        width: this.props.containerWidth,
        height: this.props.containerHeight
      }}>
        {`${this.props.containerWidth}px x ${this.props.containerHeight}px`}
        <MyReactClass height={this.props.containerHeight} width={this.props.containerWidth} data={this.props.data} schoolData={this.props.schoolData}></MyReactClass>
      </div>
		)
  }
}

const EnhancedComponent = Dimensions({elementResize: true, className: 'react-dimensions-wrapper'})(MyComponent)

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
    // declare our variables
    var scores = [];
    let satScore = [];
    var dataset = [];
    let gpa = 0;
    let gpaWeighted = this.props.data.gpa[0][0];

    if (this.props.data.satScore.length > 0){
      for (var i = 0; i < this.props.data.satScore.length; i++) {
        var satDate = this.props.data.satScore[i][0];
        var satReadingAndWriting = this.props.data.satScore[i][1];
        var satMath = this.props.data.satScore[i][2];
        var satTotal = parseInt(satReadingAndWriting) + parseInt(satMath);
        dataset.push([satTotal, gpaWeighted, {date: satDate, readingAndWriting: satReadingAndWriting, math: satMath}]);
      }
    }
    else {
      // Otherwise set some defaul values.
      var dataset = [ [1440, 2.3] ];
    }

    const school = this.props.data.school[0];
    let schoolIndex = _.findIndex(this.props.schoolData, function(o) { return o.collegeName == school; });
    let schoolSat50 = this.props.schoolData[schoolIndex].SAT50;
    let schoolGPA = this.props.schoolData[schoolIndex].weightedGPA;
    // var dataSchool = [ [1040, 3] ];
    var dataSchool = [ [schoolSat50, schoolGPA] ];

    // console.log(scores);
    var node = Faux.createElement('svg');

    // http://alignedleft.com/tutorials/d3/making-a-bar-chart
    // var w = 600;
    // var h = 400;
    var w = this.props.width;
    var h = this.props.height;
    var barPadding = 1;
    var padding = 20;

    var svg = d3.select(node)
      .attr("width", w)
      .attr("height", h);

    // Define Scales
    var xScale = d3.scaleLinear()
       .domain([0, 1600])
       .range([padding, w - padding * 2 ]);

    var yScale = d3.scaleLinear()
        .domain([0, 5])
        .range([h - padding, padding]);

    // Define Axes
    var xAxis = d3.axisBottom(xScale).ticks(8);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    svg.selectAll("rect")
      .data(dataSchool)
      .enter()
      .append("rect")
      .attr("fill", "#C5CAE9")
      .attr("x", 0)
      // .attr("opacity", 0.5)
      .attr("y", function(d){
        return yScale(d[1])
      })
      .attr("transform", "translate(" + padding + ",0)")
      .attr("width", function(d){
        return xScale(d[0]);
      })
      .attr("height", function(d){
        return h - padding - yScale(d[1]) ;
      });

      /**
      * circle representing the score
      **/
      var rScale = d3.scaleLinear()
         .domain([0, 1600])
         .range([4, 16]);

      svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("fill","#303F9F")
       .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        // .attr("r", 5);
        .attr("r", function(d) {
            // return Math.sqrt(h - d[1]);
            return rScale(d[0]);
        });

    // svg.selectAll("text")
    //   .data(dataset)
    //   .enter()
    //   .append("text")
    //   .text("yellow")
    //   .attr("x", function(d) {
    //      return xScale(d[0]);
    //   })
    //   .attr("y", function(d) {
    //       return yScale(d[1]);
    //   })
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", "11px")
    //   .attr("fill", "black");

    return node.toReact();
  }
})

export default Graph;
