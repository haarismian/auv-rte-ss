import React from "react";
import { HotTable } from "@handsontable-pro/react";
// import { HotTable } from '@handsontable/react'; // for Handsontable Community Edition

import "handsontable-pro/dist/handsontable.full.css";

const Spreadsheet = React.forwardRef((props, ref) => (
  <HotTable
    ref={ref}
    data={props.data}
    colHeaders={true}
    contextMenu
    mergeCells
    rowHeaders={true}
    width="1000"
    height="300"
    stretchH="all"
    formulas={true}
    afterSelection={(e, column, row) => {
      props.onCellSelect(e, row, column, ref.current);
    }}
    afterCreateCol={(i, a, s) => {
      props.afterCreateC(i, a, s, ref.current);
    }}
    afterCreateRow={(i, a, s) => {
      props.afterCreateR(i, a, s, ref.current);
    }}
    manualColumnResize
    manualRowResize
    manualColumnFreeze
    comments
  />
));

export default Spreadsheet;
