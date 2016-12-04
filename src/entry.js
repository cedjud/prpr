import React from 'react';
import ReactDOM from 'react-dom';

var data = require('./data.json');

// Components
import Question from './components/question.jsx';
import Debug from './components/debug.jsx';
import Graph from './components/graph.jsx';

require('./index.html');
require('./hamburgers.min.css');
// require('./scss/style.scss');
require('./style.scss');
require('./js/hammer.min.js');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      story: '',
      responses: []
    };
    this.gotoIndex = this.gotoIndex.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.updateStory = this.updateStory.bind(this);
  }
  // componentDidMount(){
  //   this.updateIndex('goto',13);
  // }
  updateStory(value, id){
    let newArray = this.state.responses;
    let exists = false;
    newArray.forEach((response) => {
      // console.log(response.id);
      if (response.id === id){
        exists = true
      }
    })
    newArray.push({ id : id, value: value} );
    this.setState({
      story: this.state.story + ' | ' + value,
      responses: newArray
    })
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
    var responses = this.state.responses.map((response, index)=>{
      return (
        <p key={index}>{response.id}: {response.value}</p>
      )
    })
    if (this.state.index === 12) {
      content = (
        <main className="content">
          <Graph data={this.state.responses}></Graph>
          </main>
        );
    } else {
      content = (
        <main className="content">
          <div className="story">
            <Story
              responses={this.state.responses}
              questions={this.props.data.questions}>
            </Story>
          </div>
          <div className="questions">
            <Question
              question={this.props.data.questions[this.state.index]}
              updateIndex={this.updateIndex}
              updateStory={this.updateStory}>
            </Question>
          </div>
        </main>
      )
    }
    return (
      <div>
        <Header title={this.props.data.title}></Header>
        {content}
        <Debug
            updateIndex={this.updateIndex}
            gotoIndex={this.gotoIndex}>
        </Debug>
      </div>
    );
  }
}


class Story extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usedQuestions: []
    }
  }
  render(){
    var responses = this.props.responses.map((response, index) => {
      return (
        <p key={index}>{response.is} {response.value}</p>
      )
    })
    return (
      <div className="">
        {responses}
      </div>
    )
  }
}

class Header extends React.Component {
  render(){
    return (
      <h1 className="header">{this.props.title}</h1>
    );
  }
}

ReactDOM.render(
  // <h1>Hello, world!</h1>,
  <App data={data}></App>,
  document.getElementById('root')
);
