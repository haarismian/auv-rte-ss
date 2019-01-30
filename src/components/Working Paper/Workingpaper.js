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
import { Link } from "@material-ui/core";

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
    cellLinks: [],
    cellLinkOrigin: null
  };

  onCellSelect = (e, row, column, ref) => {
    if (
      this.state.cellLinks === undefined ||
      this.state.cellLinks.length === 0
    ) {
      this.cellLinkRefresh();
    }
    console.log(this.state.cellLinks);
    console.log(this.components);

    if (this.state.originMode === true) {
      let cellLinkOriginTemp = { y: row, x: column, tableID: ref.id };
      this.setState({
        cellLinkOrigin: cellLinkOriginTemp,
        originMode: false
      });
    }

    if (this.state.destinationMode === true) {
      let cellLinkDestinationTemp = { y: row, x: column, tableID: ref.id };
      let cellLinksArray = this.state.cellLinks;

      cellLinksArray.push({
        origin: this.state.cellLinkOrigin,
        destination: cellLinkDestinationTemp
      });

      this.setState({
        cellLinks: cellLinksArray,
        destinationMode: false
      });
      this.cellLinkRefresh();
    }
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
      <Spreadsheet
        onCellSelect={this.onCellSelect}
        data={DATA.agreeLeadsheetData}
        ref={agreeLeadSheetRef}
        afterChange={this.cellLinkRefresh}
      />
    );

    this.setState({ state: this.state });
  };

  renderSampleCalculation = () => {
    let sampleCalculationRef = React.createRef();

    this.components.push(
      <Spreadsheet
        onCellSelect={this.onCellSelect}
        data={DATA.sampleCalculation}
        ref={sampleCalculationRef}
        afterChange={this.cellLinkRefresh}
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
    this.setState({ originMode: true });
    alert("select origin cell");
  };

  destinationLink = () => {
    this.setState({ destinationMode: true });
    alert("select destination cell");
  };

  renderButtons = () => {
    return (
      <div>
        <button onClick={this.setTable2CellValue}>
          Set Table 2 population to the final difference in table 1
        </button>
        <button onClick={this.originLink}>Oirigin Link</button>
        <button onClick={this.destinationLink}>Destination Link</button>
        <button onClick={this.cellLinkRefresh}>Refresh Links</button>
      </div>
    );
  };

  renderTrackers = () => {
    const tracker = this.state.cellLinks.map(Link => {
      debugger;
      let originCoordY = Link.origin.y;
      let originCoordX = Link.origin.x;
      let originTableID = Link.origin.tableID;
      let destinationCoordY = Link.destination.y;
      let destinationCoordX = Link.destination.x;
      let destinationTableID = Link.destination.tableID;
      return (
        <li>
          origin: y: {originCoordY}, origin x: {originCoordX}, originTable:{" "}
          {originTableID}, destination y: {destinationCoordY}, destination x:{" "}
          {destinationCoordX}, desintationTable: {destinationTableID}
        </li>
      );
    });
    return <ul>{tracker}</ul>;
    // return (
    //   <div>
    //     <h2>
    //       selectedCellXStart: {this.state.selectedCellXStart}
    //       selectedCellYStart: {this.state.selectedCellYStart}, selectedCellXEnd:{" "}
    //       {this.state.selectedCellXEnd}, selectedCellYEnd:{" "}
    //       {this.state.selectedCellYEnd},
    //     </h2>
    //     <h2>copyableData: {this.state.copyableData}</h2>
    //     <h2>storedCellValue: {this.state.storedCellValue}</h2>
    //     <h2>table ID: {this.state.activeTableRef}</h2>
    //   </div>
    // );
  };

  setTable2CellValue = () => {
    let populationValue = this.components[0].ref.current.hotInstance.getCopyableData(
      8,
      3
    );
    this.components[1].ref.current.hotInstance.setDataAtCell(
      4,
      1,
      populationValue
    );
  };

  cellLinkRefresh = () => {
    this.state.cellLinks.forEach(Link => {
      let originCoordY = Link.origin.y;
      let originCoordX = Link.origin.x;
      let originTableID = Link.origin.tableID;
      let destinationCoordY = Link.destination.y;
      let destinationCoordX = Link.destination.x;
      let destinationTableID = Link.destination.tableID;
      let valueToCopy;

      this.components.forEach(component => {
        if (component.ref.current.id === originTableID) {
          valueToCopy = component.ref.current.hotInstance.getCopyableData(
            originCoordY,
            originCoordX
          );
        }
      });
      this.components.forEach(component => {
        if (component.ref.current.id === destinationTableID) {
          component.ref.current.hotInstance.setDataAtCell(
            destinationCoordY,
            destinationCoordX,
            valueToCopy
          );
        }
      });
    });
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
