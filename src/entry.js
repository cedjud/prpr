import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red500, red700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var data = require('./data.json');
const schoolData = require('./schoolData.json');

// Components
import Debug from './components/debug.jsx';
import Graph from './components/graph.jsx';
import Header from './components/header.jsx';
import Question from './components/question.jsx';
import Story from './components/story.jsx';

require('./index.html');
require('./hamburgers.min.css');
require('normalize.css');
require('./style.scss');
require('./js/hammer.min.js');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      responsesObject: {},
      responses: [],
      sidePanelActve: false
    };
    this.gotoIndex = this.gotoIndex.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.updateStory = this.updateStory.bind(this);
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }
  // componentDidMount(){
  //   this.updateIndex('goto',11);
  // }

  toggleSidePanel(){
    console.log('side');
    this.setState({
      sidePanelActve: !this.state.sidePanelActve
    })
  }

  updateStory(value, id){
    let newObject = this.state.responsesObject;
    if (_.has(newObject, id)){
      newObject[id].push(value);
    } else {
      newObject[id] = new Array();
      newObject[id].push(value);
    }
  }

  updateIndex(type, target){
    switch (type) {
      case 'next':
        if (this.state.index < this.props.data.questions.length){
          this.setState({
            index: this.state.index + 1,
          });
        }
        break;

      case 'previous':
        if ( this.state.index >= 1 ){
          this.setState({
            index: this.state.index - 1,
          });
        }
        break;

      case 'goto':
        this.setState({
          index: target - 1,
        });
        break;

      default:
        console.log("Argument should be 'next', 'previous' or 'goto'.")
    }
  }

  gotoIndex(event){
    event.preventDefault();
    if (event.target.number.value <= this.props.data.questions.length && event.target.number.value >= 0){
      this.updateIndex('goto', parseInt(event.target.number.value));
    } else {
      console.log("Target out of range.");
    }
  }

  render(){
    var content;
    var schools = this.props.schoolData.map((school, index) => {
      return school.collegeName;
    });
    if (this.state.index === 10) {
      content = (
        <div className="graph">
          <Graph data={this.state.responsesObject} schoolData={this.props.schoolData}></Graph>
          <div className="sidepanel-toggle" onClick={this.toggleSidePanel}>
            <i className="material-icons">arrow_forward</i>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="questions">
          <Question
            schools={schools}
            question={this.props.data.questions[this.state.index]}
            updateIndex={this.updateIndex}
            updateStory={this.updateStory}>
          </Question>
          <div className="sidepanel-toggle" onClick={this.toggleSidePanel}>
            <i className="material-icons">arrow_forward</i>
          </div>
        </div>
      )
    }
    return (
      <div className={this.state.sidePanelActve ? 'active' : 'inactive'}>
        <Header title={this.props.data.title}></Header>
        <main className="content">
          <div className="story">
            <Story
              responses={this.state.responsesObject}
              questions={this.props.data.questions}>
            </Story>
            <div className="sidepanel-toggle" onClick={this.toggleSidePanel}>
              <i className="material-icons">arrow_back</i>
            </div>
          </div>
          {content}
        </main>
        {/* <Debug
            updateIndex={this.updateIndex}
            gotoIndex={this.gotoIndex}>
        </Debug> */}
      </div>
    );
  }
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500,
    primary2Color: red700,
  },
});

const AppWrapper = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <App data={data} schoolData={schoolData}></App>
  </MuiThemeProvider>
);

// Render React Root
ReactDOM.render(
  // <App data={data} schoolData={schoolData}></App>,
  <AppWrapper />,
  document.getElementById('root')
);
