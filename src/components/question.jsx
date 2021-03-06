import React from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';
// or es5

import Form from './questions/form.jsx';
import Select from './questions/select.jsx';
import Multiple from './questions/multiple.jsx';
import TrueFalse from './questions/boolean.jsx';
import List from './questions/list.jsx';

class Question extends React.Component {
  render(){
    var responses;
    switch (this.props.question.responses.type) {
      case "multiple":
        responses = <Multiple
                        questionId={this.props.question.id}
                        responses={this.props.question.responses}
                        schools={this.props.schools}
                        updateIndex={this.props.updateIndex}
                        updateStory={this.props.updateStory}>
                    </Multiple>
        break;
      case "list":
        responses = <List
                        questionId={this.props.question.id}
                        responses={this.props.question.responses}
                        schools={this.props.schools}
                        updateIndex={this.props.updateIndex}
                        updateStory={this.props.updateStory}>
                    </List>
        break;
      case "boolean":
        responses = <TrueFalse
                      questionId={this.props.question.id}
                      responses={this.props.question.responses}
                      updateIndex={this.props.updateIndex}
                      updateStory={this.props.updateStory}>
                    </TrueFalse>
        break;
      case "form":
        responses = <Form
                      questionId={this.props.question.id}
                      responses={this.props.question.responses}
                      updateIndex={this.props.updateIndex}
                      updateStory={this.props.updateStory}>
                    </Form>
        break;
      default:
        console.log("No template for this question type.")
    }
    return (
      <div className="question">
        <p>nº {this.props.question.id} / 11</p>
        <h3>{this.props.question.title}</h3>
          {responses}
      </div>
    );
  }
}

export default Question;
