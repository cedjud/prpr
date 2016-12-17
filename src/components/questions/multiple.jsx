import React from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';

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
    let responses;
    let values;
    if (this.props.responses.json === true){
        values = this.props.schools;
    } else {
      values = this.props.responses.values;
    }
    responses = values.map((response, index) => {
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

export default Multiple;
