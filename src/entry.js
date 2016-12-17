import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

var data = require('./data.json');
const schoolData = require('./schoolData.json');

// Components
import Debug from './components/debug.jsx';
import Graph from './components/graph.jsx';
import Header from './components/header.jsx';
import Question from './components/question.jsx';
import Story from './components/story.jsx';

require('./index.html');
require('./hamburgers.min.css');
// require('./scss/style.scss');
require('normalize.css');
require('./style.scss');
require('./js/hammer.min.js');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      responsesObject: {},
      responses: []
    };
    this.gotoIndex = this.gotoIndex.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.updateStory = this.updateStory.bind(this);
  }
  // componentDidMount(){
  //   this.updateIndex('goto',11);
  // }
  updateStory(value, id){
    let newObject = this.state.responsesObject;
    if (_.has(newObject, id)){
      newObject[id].push(value);
    } else {
      newObject[id] = new Array();
      newObject[id].push(value);
    }
  }
  updateIndex(type, target){
    switch (type) {
      case 'next':
        if (this.state.index < this.props.data.questions.length){
          this.setState({
            index: this.state.index + 1,
          });
        }
        break;

      case 'previous':
        if ( this.state.index >= 1 ){
          this.setState({
            index: this.state.index - 1,
          });
        }
        break;

      case 'goto':
        this.setState({
          index: target - 1,
        });
        break;

      default:
        console.log("Argument should be 'next', 'previous' or 'goto'.")
    }
  }

  gotoIndex(event){
    event.preventDefault();
    if (event.target.number.value <= this.props.data.questions.length && event.target.number.value >= 0){
      this.updateIndex('goto', parseInt(event.target.number.value));
    } else {
      console.log("Target out of range.");
    }
  }

  render(){
    var content;
    var schools = this.props.schoolData.map((school, index) => {
      return school.collegeName;
    });
    if (this.state.index === 10) {
      content = (
          <Graph data={this.state.responsesObject} schoolData={this.props.schoolData}></Graph>
)
    } else {
      content = (
        <div className="questions">
          <Question
            schools={schools}
            question={this.props.data.questions[this.state.index]}
            updateIndex={this.updateIndex}
            updateStory={this.updateStory}>
          </Question>
        </div>
      )
    }
    return (
      <div>
        <Header title={this.props.data.title}></Header>
        <main className="content">
          <div className="story">
            <Story
              responses={this.state.responsesObject}
              questions={this.props.data.questions}>
            </Story>
          </div>
          {content}
        </main>
        <Debug
            updateIndex={this.updateIndex}
            gotoIndex={this.gotoIndex}>
        </Debug>
      </div>
    );
  }
}

// Render React Root
ReactDOM.render(
  <App data={data} schoolData={schoolData}></App>,
  document.getElementById('root')
);
