import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import FlatButton from 'material-ui/FlatButton';

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
  handleResponse(event){
    event.preventDefault();
    let inputs = event.target.querySelectorAll('input');
    let values = [];
    inputs.forEach((input) => {
      values.push(input.value)
    });
    this.props.updateStory(values, this.props.responses.name);
    this.props.updateIndex('next');
  }
  render(){
    var responses = this.props.responses.inputs.map((response, index) => {
      let inputElement = null;
      if (response.type === "date"){
          inputElement = <DatePicker autoOk={true} id={response.type + index} name={response.type + index} ref={"input" + index} hintText={response.label} fullWidth={true}/>
      }
      if (response.type === "number"){
          inputElement = <TextField id={response.type + index} step={response.step} type="number" max={response.max} min={response.min} fullWidth={true} />
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
        <FlatButton type="submit" label="confirm" />
      </form>
    )
  }
}

export default Form;
