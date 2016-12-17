import React from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';

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

export default Form;
