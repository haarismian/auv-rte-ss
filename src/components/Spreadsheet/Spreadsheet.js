// import React from "react";
// import { HotTable } from "@handsontable-pro/react";
// // import { HotTable } from '@handsontable/react'; // for Handsontable Community Edition

// import "handsontable-pro/dist/handsontable.full.css";

// class Spreadsheet extends React.Component {
//   constructor(props) {
//     super(props);

//     // this.hotTableComponent = React.createRef();
//     this.ref = React.createRef();
//   }

//   // const Spreadsheet = React.forwardRef((props,ref) => ())

//   onCellSelect = () => {
//     let coord = this.ref.current.hotInstance.getSelected();
//     let copyableData = this.ref.current.hotInstance.getCopyableData(
//       coord[0][0],
//       coord[0][1]
//     );
//     this.props.onCellSelect(coord, copyableData, this.ref);
//     // console.log(this.hotTableComponent.current)
//   };

//   swapHotData = () => {
//     // The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
//     this.hotTableComponent.current.hotInstance.loadData([["new", "data"]]);
//   };



//   render() {
//     return (
//       <div id="hot-app">
//         <HotTable
//           ref={this.ref}
//           data={this.props.data}
//           colHeaders={true}
//           contextMenu
//           mergeCells
//           rowHeaders={true}
//           width="1000"
//           height="300"
//           stretchH="all"
//           formulas={true}
//           afterSelection={this.onCellSelect}
//           manualColumnResize
//           manualRowResize
//         />
//         <button onClick={this.swapHotData.bind(this)}>Load new data!</button>
//       </div>
//     );
//   }
// }

// export default Spreadsheet;
