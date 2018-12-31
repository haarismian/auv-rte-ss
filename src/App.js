import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Spreadsheet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import Spreadsheet from './components/Spreadsheet';
import TextEdit from './components/TextEdit';

class App extends Component {
  constructor(props) {
    super(props);

    this.spreadsheet = this.spreadsheet.bind(this);
    this.textEdit = this.textEdit.bind(this);
  }

  spreadsheet() {
    ReactDOM.render(<Spreadsheet />, document.getElementById('content'));
  }

  textEdit() {
    ReactDOM.render(<TextEdit />, document.getElementById('content'));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header>
            <FlatButton label="spreadsheet" onClick={this.spreadsheet} />
            <FlatButton label="text edit" onClick={this.textEdit} />
          </header>
          <div id="content" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
