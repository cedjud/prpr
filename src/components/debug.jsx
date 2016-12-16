import React from 'react';
import ReactDOM from 'react-dom';

class Debug extends React.Component {
  render(){
    return (
      <div className="debug">
        <button onClick={() => this.props.updateIndex('previous')}>◁ previous ☞</button>
        <button onClick={() => this.props.updateIndex('next')}>next ▷</button>
        <form onSubmit={this.props.gotoIndex}>
          <input type="number" name="number"></input>
          <button type="Submit">Go to ☞</button>
        </form>
      </div>
    );
  }
}

export default Debug;
