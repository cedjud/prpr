import React from 'react';
import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';

import NumericInput from 'react-numeric-input';

// Boolean choice component
class TrueFalse extends React.Component {
  constructor(props){
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
  }
  componentDidMount(){
   ReactDOM.findDOMNode(this.refs.input0).focus();
  }
  handleResponse(value){
    if (value === 'next'){
      this.props.updateIndex('next');
    } else {
      this.props.updateIndex(value[0],value[1]);
    }
  }
  render(){
    return (
      <div className="truefalse">
        <FlatButton onClick={() => {this.handleResponse(this.props.responses.true)}} label="Yes" ref="input0" />
        <FlatButton onClick={() => {this.handleResponse(this.props.responses.false)}} label="No" />
      </div>
    )
  }
}

export default TrueFalse;
