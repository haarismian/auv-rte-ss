import React from "react";

const EngagementInfo = props => {
  return (
    <div>
      <h2>Entity Name: {props.engagementInfo.name}</h2>
      <h2>Year End: {props.engagementInfo.yearEnd}</h2>

      <div>
        <h2>Materiality: {props.engagementInfo.materiality}</h2>
        <h2>Performance Materiality: {props.engagementInfo.performanceMateriality}</h2>
        <h2>CTT: {props.engagementInfo.ctt}</h2>
      </div>
    </div>
  );
};

export default EngagementInfo;
