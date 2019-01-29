import React from "react";

const WorkingPaperInstructions = props => {
  return (
    <div>
      <h2>Entity Name: {props.data.name}</h2>
      <h2>Year End: {props.data.yearEnd}</h2>

      <div>
        <h2>Materiality: {props.data.materiality}</h2>
        <h2>Performance Materiality: {props.data.performanceMateriality}</h2>
        <h2>CTT: {props.data.ctt}</h2>
      </div>
    </div>
  );
};

export default WorkingPaperInstructions;
