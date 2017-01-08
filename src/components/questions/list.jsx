import React from 'react';
import ReactDOM from 'react-dom';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import NumericInput from 'react-numeric-input';

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        value: this.props.schools[0]
    }
    this.handleResponse = this.handleResponse.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleResponse(event){
    this.props.updateIndex('next');
    this.props.updateStory(event.target.value, this.props.responses.name);
  }

   handleChange(event, index, value){
     this.setState({
       value: value
     });
     this.props.updateIndex('next');
     this.props.updateStory(value, this.props.responses.name);
   }
  // componentDidMount(){
  //  ReactDOM.findDOMNode(this.refs.input0).focus();
  // }
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
        <MenuItem key={index} ref={"input" + index} value={response} primaryText={response} />
      )
    });
    return (
      <DropDownMenu value={this.state.value} autoWidth={false} onChange={this.handleChange} style={{width: '100%'}}>
        {responses}
      </DropDownMenu>
    )
  }
}

export default List;
