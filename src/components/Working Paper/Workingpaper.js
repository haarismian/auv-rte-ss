import React from "react";
import ReactDOM from "react-dom";

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

  afterCreateC = (index, amount, source, ref) => {
    var cellLinksArray = this.state.cellLinks;

    cellLinksArray.forEach((Link, i) => {
      let originCoordX = Link.origin.x;
      let originTableID = Link.origin.tableID;
      let destinationCoordX = Link.destination.x;
      let destinationTableID = Link.destination.tableID;

      if (ref.id === originTableID) {
        if (index <= originCoordX) {
          cellLinksArray[i].origin.x += amount;
        }
      }
      if (ref.id === destinationTableID) {
        if (index <= destinationCoordX) {
          cellLinksArray[i].destination.x += amount;
        }
      }
    });

    this.setState({ cellLinks: cellLinksArray });
  };

  afterCreateR = (index, amount, source, ref) => {
    var cellLinksArray = this.state.cellLinks;

    cellLinksArray.forEach((Link, i) => {
      let originCoordY = Link.origin.y;
      let originTableID = Link.origin.tableID;
      let destinationCoordY = Link.destination.y;
      let destinationTableID = Link.destination.tableID;

      if (ref.id === originTableID) {
        if (index <= originCoordY) {
          cellLinksArray[i].origin.y += amount;
        }
      }
      if (ref.id === destinationTableID) {
        if (index <= destinationCoordY) {
          cellLinksArray[i].destination.y += amount;
        }
      }
    });

    this.setState({ cellLinks: cellLinksArray });
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
        afterCreateC={this.afterCreateC}
        afterCreateR={this.afterCreateR}
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
        afterCreateC={this.afterCreateC}
        afterCreateR={this.afterCreateR}
      />
    );

    this.setState({ state: this.state });
  };

  sampleTest = () => {
    let sampleTestRef = React.createRef();

    this.components.push(
      <Spreadsheet
        onCellSelect={this.onCellSelect}
        ref={sampleTestRef}
        afterChange={this.cellLinkRefresh}
        afterCreateC={this.afterCreateC}
        afterCreateR={this.afterCreateR}
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
        <button onClick={this.originLink}>Oirigin Link</button>
        <button onClick={this.destinationLink}>Destination Link</button>
        <button onClick={this.cellLinkRefresh}>Refresh Links</button>
      </div>
    );
  };

  renderTrackers = () => {
    const tracker = this.state.cellLinks.map(Link => {
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
          sampleTest={this.sampleTest}
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
