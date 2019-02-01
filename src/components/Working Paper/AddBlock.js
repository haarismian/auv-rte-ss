import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.engagementInfo = this.props.engagementInfo;
  }

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderEngagementInfo = () => {
  this.props.renderEngagementInfo()
  this.handleClose()
  }

  renderWorkingPaperInstructions = () => {
  this.props.renderWorkingPaperInstructions()
  this.handleClose()
  }

  renderAgreeLeadSheet = () => {
  this.props.renderAgreeLeadSheet()
  this.handleClose()
  }
  renderSampleCalculation = () => {
  this.props.renderSampleCalculation()
  this.handleClose()
  }

  sampleTest = () => {
    this.props.sampleTest()
    this.handleClose()
    }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Add Component
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.renderEngagementInfo}>Engagement Info</MenuItem>
          <MenuItem onClick={this.renderAgreeLeadSheet}>Agree Leadsheet</MenuItem>
          <MenuItem onClick={this.renderSampleCalculation}>Sample Calculator</MenuItem>
          <MenuItem onClick={this.sampleTest}>Sample Test</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
