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
    linkSettingMode: false
  };

  onCellSelect = () => {
    let coord = this.ref.current.hotInstance.getSelected();
    // let copyableData = this.ref.current.hotInstance.getCopyableData(
    //   coord[0][0],
    //   coord[0][1]
    // );

    let activeTable = this.ref.current.id;

    this.setState({
      // selectedCellXStart: coord[0][0],
      // selectedCellYStart: coord[0][1],
      // selectedCellXEnd: coord[0][2],
      // selectedCellYEnd: coord[0][3],
      activeTableRef: activeTable
    });

    this.setTable2CellValue();
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
    this.ref = React.createRef();

    var newComponentsState = this.state.components;

    newComponentsState.push(
      <HotTable
        ref={this.ref}
        data={DATA.agreeLeadsheetData}
        colHeaders={true}
        contextMenu
        mergeCells
        rowHeaders={true}
        width="1000"
        height="300"
        stretchH="all"
        formulas={true}
        afterSelection={this.onCellSelect}
        manualColumnResize
        manualRowResize
        manualColumnFreeze
      />
    );

    // newComponentsState.push(
    //   <Spreadsheet
    //     ref={this.forwardref}
    //     onCellSelect={this.onCellSelect}
    //     data={DATA.agreeLeadsheetData}
    //     id="agreeLeadSheet"
    //   />
    // );

    this.setState({ components: newComponentsState });
  };

  renderSampleCalculation = () => {
    this.ref = React.createRef();

    var newComponentsState = this.state.components;

    newComponentsState.push(
      <HotTable
        ref={this.ref}
        data={DATA.sampleCalculation}
        colHeaders={true}
        contextMenu
        mergeCells
        rowHeaders={true}
        width="1000"
        height="300"
        stretchH="all"
        formulas={true}
        afterSelection={this.onCellSelect}
        manualColumnResize
        manualRowResize
        manualColumnFreeze
      />
    );

    // newComponentsState.push(
    //   <Spreadsheet
    //     ref={this.forwardref}
    //     onCellSelect={this.onCellSelect}
    //     data={DATA.sampleCalculation}
    //     id="agreeSampleCalculation"
    //   />
    // );

    this.setState({ components: newComponentsState });
  };

  storeCellValue = () => {
    this.setState({
      storedCellValue: this.state.copyableData
    });
  };

  table1 = () => {
    console.log(
      this.state.components[0].ref.current.hotInstance.getCopyableData(8, 3)
    );
  };

  table2 = () => {
    console.log(
      this.state.components[1].ref.current.hotInstance.getCopyableData(0, 0)
    );
  };

  setTable2CellValue = () => {
    let table1CellValue = this.state.components[0].ref.current.hotInstance.getCopyableData(
      8,
      3
    );
    this.state.components[1].ref.current.hotInstance.setDataAtCell(
      4,
      1,
      table1CellValue
    );
  };

  setLink = () => {
    this.setState({ linkSettingMode: true });
  };

  render() {
    console.log(
      this.state.components[1] ? this.state.components[0].ref.current.id : ""
    );
    return (
      <div id="working-paper">
        <AddBlock
          engagementInfo={this.props.engagementInfo}
          renderEngagementInfo={this.renderEngagementInfo}
          renderWorkingPaperInstructions={this.renderWorkingPaperInstructions}
          renderAgreeLeadSheet={this.renderAgreeLeadSheet}
          renderSampleCalculation={this.renderSampleCalculation}
        />

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

        <button onClick={this.setLink}>Link Setting Mode</button>

        {this.state.components.map(component => (
          <div>{component}</div>
        ))}

        <div id="components" />
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
  }
}

export default Workingpaper;
