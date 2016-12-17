import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class Story extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usedQuestions: []
    }
  }
  render(){
    const responses = _.values(this.props.responses);
    const keys = _.keys(this.props.responses);
    var story = keys.map((key, index) => {
      return (
        <dl key={index}>
        <dt>{key}</dt>
        {this.props.responses[key].map((response,index) => {
          if (typeof(response) === "string" ){
            return (
              <dd key={index}>{response}</dd>
            )
          } else {
            return (
              <dd key={index}>
                 {response.map((responsePart,index) => {
                  return (
                    <span key={index}>{responsePart}</span>
                  )
                 })}
              </dd>
            )
          }
        })}
      </dl>
      )
    })
    return (
      <div className="">
        {story}
      </div>
    )
  }
}

export default Story;
