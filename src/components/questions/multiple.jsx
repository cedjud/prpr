import React from 'react';
import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';

import NumericInput from 'react-numeric-input';

class Multiple extends React.Component {
  constructor(props){
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
  }
  handleResponse(event){
    // First arguement to updateStory() doesn't work when an array, why?
    let eventArray = [event]
    this.props.updateIndex('next');
    this.props.updateStory(eventArray, this.props.responses.name);
  }
  render(){
    let responses;
    let values;
    if (this.props.responses.json === true){
        values = this.props.schools;
    } else {
      values = this.props.responses.values;
    }
    responses = values.map((response, index) => {
      return (
        // <button key={index} onClick={this.handleResponse} ref={"input" + index} value={response}>{response}</button>
        <FlatButton label={response} key={index} onClick={() => {this.handleResponse(response)}} ref={"input" + index} />
      )
    })
    return (
      <div className="multiple">
        {responses}
      </div>
    )
  }
}

export default Multiple;
