import React from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';

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
    // this.props.updateIndex('next');
    // this.props.updateStory(event.target.value, this.props.responses.name);
  }
  render(){
    var responses = this.props.schools.map((response, index) => {
      return (
        <option key={index} value={response}>{response}</option>
      )
    });
    return (
      <select onClick={this.handleResponse} onChange={this.handleChange} size="5" autoFocus>
        {responses}
      </select>
    )
  }
}

export default Select;
