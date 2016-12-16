import React from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';
// or es5

class Question extends React.Component {
  render(){
    var responses;
    if (this.props.question.responses.type == "multiple") {
      responses = <Multiple
                      questionId={this.props.question.id}
                      responses={this.props.question.responses}
                      updateIndex={this.props.updateIndex}
                      updateStory={this.props.updateStory}>
                  </Multiple>
    } else if (this.props.question.responses.type === "list") {
      responses = <Select
                      questionId={this.props.question.id}
                      responses={this.props.question.responses}
                      schools={this.props.schools}
                      updateIndex={this.props.updateIndex}
                      updateStory={this.props.updateStory}>
                  </Select>
    } else if (this.props.question.responses.type === "boolean") {
      responses = <Boolean
                    questionId={this.props.question.id}
                    responses={this.props.question.responses}
                    updateIndex={this.props.updateIndex}
                    updateStory={this.props.updateStory}>
                  </Boolean>
    } else if (this.props.question.responses.type === "form") {
      responses = <Form
                    questionId={this.props.question.id}
                    responses={this.props.question.responses}
                    updateIndex={this.props.updateIndex}
                    updateStory={this.props.updateStory}>
                  </Form>
    }
    return (
      <div className="form-question">
        {/* <h3>nº {this.props.question.id} / 12</h3> */}
        <p>{this.props.question.title}</p>
          {responses}
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
    this.props.updateStory(event.target.value, this.props.responses.name);
  }
  componentDidMount(){
   ReactDOM.findDOMNode(this.refs.input0).focus();
  }
  render(){
    var responses = this.props.responses.values.map((response, index) => {
      return (
        <button key={index} onClick={this.handleResponse} ref={"input" + index} value={response}>{response}</button>
      )
    })
    return (
      <div>
        {responses}
      </div>
    )
  }
}

// Select component
class Select extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.responses.values[0]
    }
    this.handleResponse = this.handleResponse.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
      this.setState = {
        value: e.target.value
      }
  }
  handleResponse(event){
    this.props.updateIndex('next');
    // console.log(event.target.value);
    // this.props.updateStory(event.target.value, this.props.questionId);
    this.props.updateStory(event.target.value, this.props.responses.name);
  }
  render(){
    // var responses = this.props.responses.values.map((response, index) => {
    var responses = this.props.schools.map((response, index) => {
      return (
        <option key={index} value={response} >{response}</option>
      )
    });
    return (
      <select onClick={this.handleResponse} onChange={this.handleChange} multiple autoFocus>
        {responses}
      </select>
    )
  }
}

// Boolean choice component
class Boolean extends React.Component {
  constructor(props){
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
  }
  componentDidMount(){
   ReactDOM.findDOMNode(this.refs.input0).focus();
  }
  handleResponse(event){
    // this.props.updateIndex('next');
    // console.log(typeof(event.target.value));
    if (event.target.value === 'next'){
      this.props.updateIndex('next');
    } else {
      // console.log(event.target.value.split(','));
      this.props.updateIndex(event.target.value.split(',')[0],event.target.value.split(',')[1]);
    }
    // this.props.updateStory(event.target.value);
  }
  render(){
    return (
      <div>
        <button onClick={this.handleResponse} value={this.props.responses.true} ref="input0">Yes</button>
        <button onClick={this.handleResponse} value={this.props.responses.false}>No</button>
      </div>
    )
  }
}

// FORM Component
class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: []
    }
    this.handleResponse = this.handleResponse.bind(this);
  }
  componentDidMount(){
   ReactDOM.findDOMNode(this.refs.input0).focus();
  }
  handleResponse(event){
    event.preventDefault();
    let inputs = event.target.querySelectorAll('input');
    let values = [];
    inputs.forEach((input) => {
      values.push(input.value)
      // console.log(input.value);
    });
    // this.props.updateStory(values, this.props.questionId);
    this.props.updateStory(values, this.props.responses.name);
    this.props.updateIndex('next');
  }
  render(){
    var responses = this.props.responses.inputs.map((response, index) => {
      let inputElement = null;
      if (response.type === "date"){
          inputElement = <input id={response.type + index} name={response.type + index} ref={"input" + index} type={response.type} />
      }
      if (response.type === "number"){
          // inputElement = <input id={response.type + index} name={response.type + index} type={response.type} min={response.min} max={response.max} />
          inputElement = <NumericInput id={response.type + index} name={response.type + index} ref={"input" + index} min={response.min} max={response.max} value={0.00} step={response.step} precision={response.precision}/>
      }
      return (
        <div key={index}>
        <label htmlFor={response.type + index}>{response.label}</label>
            {inputElement}
        </div>
      )
    });
    return (
      <form onSubmit={this.handleResponse}>
        {responses}
        <button type="submit">confirm</button>
      </form>
    )
  }
}

export default Question;
