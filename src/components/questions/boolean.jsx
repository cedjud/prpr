import React from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';


// Boolean choice component
class YesNo extends React.Component {
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

export default YesNo;
