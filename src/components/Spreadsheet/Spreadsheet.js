import React from "react";
import { HotTable } from "@handsontable-pro/react";
// import { HotTable } from '@handsontable/react'; // for Handsontable Community Edition

import "handsontable-pro/dist/handsontable.full.css";

class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);

    // this.hotTableComponent = React.createRef();
    this.ref = React.createRef();
  }

  render() {
    return (
      <div id="hot-app">
        <HotTable
          ref={this.ref}
          data={this.props.data}
          colHeaders={true}
          contextMenu
          mergeCells
          rowHeaders={true}
          width="1000"
          height="300"
          stretchH="all"
          formulas={true}
          afterSelection={
              (e, column, row) => {
            this.props.onCellSelect(
              e,
              row,
              column
            );
          }}
          manualColumnResize
          manualRowResize
          manualColumnFreeze
        />
      </div>
    );
  }
}

export default Spreadsheet;
