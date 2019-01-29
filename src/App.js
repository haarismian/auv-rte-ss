import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import Spreadsheet from './components/Spreadsheet/Spreadsheet';
import TextEdit from './components/TextEdit';
import WorkingPaper from "./components/Working Paper/Workingpaper";

class App extends Component {
  constructor(props) {
    super(props);

    // this.spreadsheet = this.spreadsheet.bind(this);
    // this.textEdit = this.textEdit.bind(this);

    this.engagementInfo = {
      name: 'Super Company',
      materiality: 2000000,
      performanceMateriality: 1000000,
      ctt: 500000,
      yearEnd: '12/12/1900'
    }

  }

  // spreadsheet() {
  //   ReactDOM.render(<Spreadsheet />, document.getElementById('content'));
  // }

  // textEdit() {
  //   ReactDOM.render(<TextEdit />, document.getElementById('content'));
  // }

  // workingPaper() {
  //   ReactDOM.render(, document.getElementById('content'));
  // }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header>
            {/* <FlatButton label="spreadsheet" onClick={this.spreadsheet} /> */}
            {/* <FlatButton label="Working Paper" onClick={this.workingPaper} engagementInfo={this.engagementInfo}/> */}
            {/* create working paper component and pass data as prop to it */}
            {/* <FlatButton label="text edit" onClick={this.textEdit} /> */}
            <WorkingPaper engagementInfo={this.engagementInfo}/>
          </header>
          <div id="content" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
