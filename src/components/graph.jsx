import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Dimensions from 'react-dimensions';
import {FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import * as d3 from "d3";
import Faux from 'react-faux-dom';

class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
      selectedSchool: this.props.data.school[0]
    };
    this.selectSchool = this.selectSchool.bind(this);
  }
  selectSchool(e){
    console.log('selectSchool');
    console.log(e.target.value);
    this.setState({
      selectedSchool: e.target.value
    })
  }
  render(){
    let schoolSelect;
    // if (this.props.data.school.length > 0){
    //   schoolSelect = (
    //     <select onChange={this.selectSchool}>
    //       {this.props.data.school.map((school,index) => {
    //           return (
    //             <option key={index}> {school} </option>
    //           );
    //       })}
    //     </select>
    //   );
    // };
    schoolSelect = (
      <FormGroup controlId="formControlsSelect">
        {/* <ControlLabel>Select</ControlLabel> */}
        <FormControl componentClass="select" placeholder="school" onChange={this.selectSchool}>
          {this.props.data.school.map((school,index) => {
              return (
                <option key={index} value={school}> {school} </option>
              );
          })}
        </FormControl>
      </FormGroup>
    );
    return (
      <div className="graph-container">
        <div className="graph__header">
          <h3>Graph Title</h3>
          {schoolSelect}
        </div>
        <div className="graph__svg">
          <EnhancedComponent data={this.state.data} school={this.state.selectedSchool} schoolData={this.props.schoolData}/>
        </div>
      </div>
    );
  }
}

class ResponsiveContainer extends React.Component {
  render () {
    return (
      <div style={{ width: this.props.containerWidth, height: this.props.containerHeight }}>
        <MyReactClass
          height={this.props.containerHeight}
          width={this.props.containerWidth}
          data={this.props.data}
          school={this.props.school}
          schoolData={this.props.schoolData}>
        </MyReactClass>
      </div>
		)
  }
}

const EnhancedComponent = Dimensions({elementResize: true, className: 'react-dimensions-wrapper'})(ResponsiveContainer)

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
    let scoreType = '';
    scoreType = "SAT50";
    let gpaWeighted = this.props.data.gpa[0][0];

    if (this.props.data.satScore && this.props.data.satScore.length > 0){
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
      var dataset = [ [1440, 2.3], [980, 4.0] ];
    }

    // const school = this.props.data.school[0];

    // get the school name
    let school = this.props.school;

    // Parse schoolData array and return object that matches school name
    let schoolIndex = _.findIndex(this.props.schoolData, function(o) { return o.collegeName == school; });
    console.log(scoreType);
    // Set schoolSat50 to type of scoreType
    let schoolSat50 = this.props.schoolData[schoolIndex][scoreType];
    // let schoolSat50 = this.props.schoolData[schoolIndex].SAT50;
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
       .attr("fill","#FFCDD2")
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
