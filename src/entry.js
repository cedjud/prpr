import React from 'react';
import ReactDOM from 'react-dom';

var data = require('./data.json');

require('./index.html');
require('./hamburgers.min.css');
// require('./scss/style.scss');
require('./js/hammer.min.js');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      story: '',
    };
    this.gotoIndex = this.gotoIndex.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.updateStory = this.updateStory.bind(this);
  }
  componentDidMount(){
    console.log('yo');
    this.updateStory(this.props.data.questions[this.state.index].story)
    // console.log(this.props.data.questions[this.state.index].story)
  }
  updateStory(string){
    this.setState({
      story: this.state.story + string
    })
  }
  updateIndex(type, target){
    switch (type) {
      case 'next':
        if (this.state.index < this.props.data.questions.length - 1 ){
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
          index: target,
        });
        break;

      default:
        console.log("Argument should be 'next', 'previous' or 'goto'.")
    }
  }
  gotoIndex(event){
    event.preventDefault();
    if (event.target.number.value < this.props.data.questions.length && event.target.number.value >= 0){
      this.updateIndex('goto', parseInt(event.target.number.value - 1));
    } else {
      console.log("Target out of range.");
    }
  }
  render(){
    return (
      <div>
        <Header title={this.props.data.title}></Header>
        {this.state.story}
        <Question question={this.props.data.questions[this.state.index]} updateIndex={this.updateIndex} updateStory={this.updateStory}></Question>
        <Controls updateIndex={this.updateIndex} gotoIndex={this.gotoIndex}></Controls>
      </div>
    );
  }
}

class Question extends React.Component {
  render(){
    var responses;
    if (this.props.question.responses.type == "multiple") {
      responses = <Multiple
                      responses={this.props.question.responses.values}
                      updateIndex={this.props.updateIndex}
                      updateStory={this.props.updateStory}>
                  </Multiple>
    }
    return (
    <div>
      <h2>{this.props.question.id}/12</h2>
      <h1>{this.props.question.title}</h1>
      {this.props.question.responses.type}
      {responses}
      {/* <Multiple responses={this.props.question.responses.values} updateIndex={this.props.updateIndex}></Multiple> */}
    </div>
    );
  }
}

class Multiple extends React.Component {
  constructor(props){
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
  }
  handleResponse(event){
    this.props.updateIndex('next');
    console.log(event.target.value);
    this.props.updateStory(event.target.value)
  }
  render(){
    var responses = this.props.responses.map((response, index) => {
      return (
        <li key={index}><button onClick={this.handleResponse} value={response}>{response}</button></li>
      )
    })
    return (
      <ul>
        {responses}
      </ul>
    )
  }
}

class Controls extends React.Component {
  render(){
    return (
      <div>
        <button onClick={() => this.props.updateIndex('previous')}>previous ☞</button>
        <button onClick={() => this.props.updateIndex('next')}>next ☞</button>
        <form onSubmit={this.props.gotoIndex}>
          <input type="number" name="number"></input>
          <button type="Submit">Goto 5 ☞</button>
        </form>
      </div>
    );
  }
}

class Header extends React.Component {
  render(){
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

ReactDOM.render(
  // <h1>Hello, world!</h1>,
  <App data={data}></App>,
  document.getElementById('root')
);
