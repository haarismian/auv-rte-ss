import React from "react";
import ReactDOM from "react-dom";

import FlatButton from "material-ui/FlatButton";

import { HotTable } from "@handsontable-pro/react";
import "handsontable-pro/dist/handsontable.full.css";

import AddBlock from "./AddBlock";
import EngagementInfo from "./Building Blocks/EngagementInfo";
import WorkingPaperInstructions from "./Building Blocks/WorkingPaperInstructions";
import Spreadsheet from "../Spreadsheet/Spreadsheet";

import { DATA } from "./Building Blocks/data";

class Workingpaper extends React.Component {
  constructor(props) {
    super(props);
    this.components = [];
  }

  state = {
    selectedCellXStart: null,
    selectedCellYStart: null,
    selectedCellXEnd: null,
    selectedCellYEnd: null,
    copyableData: null,
    storedCellValue: null,
    activeTableRef: null,
    components: [],
    originMode: false,
    destinationMode: false,
    linkingCell: null
  };

  onCellSelect = (
    e,
    row,
    column,
  ) => {
    console.log("r:" + row);
    console.log("c:" + column);

    if (this.state.originMode===true && this.state.linkingCell !== null) {
      this.setState({linkingCell: {y: row, x: column}})
    } else if (this.state.linkingCell) {
      
    }

    // let activeTable = this.ref.current.id;
    // this.setState({
    //   // selectedCellXStart: coord[0][0],
    //   // selectedCellYStart: coord[0][1],
    //   // selectedCellXEnd: coord[0][2],
    //   // selectedCellYEnd: coord[0][3],
    //   activeTableRef: activeTable
    // });
  };

  renderEngagementInfo = () => {
    ReactDOM.render(
      <EngagementInfo engagementInfo={this.props.engagementInfo} />,
      document.body.appendChild(document.createElement("div"))
    );
  };

  renderWorkingPaperInstructions = () => {
    ReactDOM.render(
      <WorkingPaperInstructions data={DATA.instructions} />,
      document.body.appendChild(document.createElement("div"))
    );
  };

  renderAgreeLeadSheet = () => {
    let agreeLeadSheetRef = React.createRef();
    this.components.push(
      <HotTable
        ref={agreeLeadSheetRef}
        data={DATA.agreeLeadsheetData}
        colHeaders={true}
        contextMenu
        mergeCells
        rowHeaders={true}
        width="1000"
        height="300"
        stretchH="all"
        formulas={true}
        afterSelection={(e, column, row) => {
          this.onCellSelect(
            e,
            row,
            column
            // row2,
            // column2,
            // preventScrolling,
            // selectionLayerLevel
          );
        }}
        manualColumnResize
        manualRowResize
        manualColumnFreeze
      />
    );

    this.setState({ state: this.state });
  };

  renderSampleCalculation = () => {
    let sampleCalculationRef = React.createRef();

    this.components.push(
      <HotTable
        ref={sampleCalculationRef}
        data={DATA.sampleCalculation}
        colHeaders={true}
        contextMenu
        mergeCells
        rowHeaders={true}
        width="1000"
        height="300"
        stretchH="all"
        formulas={true}
        afterSelection={(e, column, row) => {
          this.onCellSelect(
            e,
            row,
            column
            // row2,
            // column2,
            // preventScrolling,
            // selectionLayerLevel
          );
        }}
        manualColumnResize
        manualRowResize
        manualColumnFreeze
      />
    );
    this.setState({ state: this.state });
  };

  storeCellValue = () => {
    this.setState({
      storedCellValue: this.state.copyableData
    });
  };

  originLink = () => {
    this.setState({originMode: true})
    alert('select origin cell')
  }

  destinationLink = () => {
    
  }

  renderButtons = () => {
    return (
      <div>
        {" "}
        <button onClick={this.storeCellValue}>
          {this.state.storedCellValue
            ? this.state.storedCellValue
            : "Store cell value"}
        </button>
        <button onClick={this.table1}>Check 0,0 on table 1</button>
        <button onClick={this.table2}>Check 0,0 on table 2</button>
        <button onClick={this.setTable2CellValue}>
          Set Table 2 population to the final difference in table 1
        </button>
        <button onClick={this.originLink}>Oirigin Link</button>
        <button onClick={this.destinationLink}>Destination Link</button>
      </div>
    );
  };

  renderTrackers = () => {
    return (
      <div>
        <h2>
          selectedCellXStart: {this.state.selectedCellXStart}
          ,selectedCellYStart: {this.state.selectedCellYStart},
          selectedCellXEnd: {this.state.selectedCellXEnd}, selectedCellYEnd:{" "}
          {this.state.selectedCellYEnd},
        </h2>
        <h2>copyableData: {this.state.copyableData}</h2>
        <h2>storedCellValue: {this.state.storedCellValue}</h2>
        <h2>table ID: {this.state.activeTableRef}</h2>
      </div>
    );
  };

  render() {
    return (
      <div id="working-paper">
        <AddBlock
          engagementInfo={this.props.engagementInfo}
          renderEngagementInfo={this.renderEngagementInfo}
          renderWorkingPaperInstructions={this.renderWorkingPaperInstructions}
          renderAgreeLeadSheet={this.renderAgreeLeadSheet}
          renderSampleCalculation={this.renderSampleCalculation}
        />
        {this.renderButtons()}

        {this.components.map(component => (
          <div>{component}</div>
        ))}

        {this.renderTrackers()}
      </div>
    );
  }
}

export default Workingpaper;
