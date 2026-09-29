import React from 'react';
import "../../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  FlexibleWidthXYPlot
} from "react-vis";

const Chart = () => {
  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 },
  ];

  return (
    <div className="admin_chart_wrapper w-100 bg-white border border-light-subtle rounded-4 p-3 mt-3 shadow-sm" style={{ minHeight: "340px" }}>
      <div className="chart_responsive_container w-100" style={{ height: "300px" }}>
        <FlexibleWidthXYPlot height={300}>
          <VerticalGridLines style={{ stroke: "#f1f5f9" }} />
          <HorizontalGridLines style={{ stroke: "#f1f5f9" }} />
          <XAxis style={{ text: { fill: "#64748b", fontSize: "0.75rem" }, line: { stroke: "#cbd5e1" } }} />
          <YAxis style={{ text: { fill: "#64748b", fontSize: "0.75rem" }, line: { stroke: "#cbd5e1" } }} />
          <LineSeries data={data} color="#0d6efd" strokeWidth={3} curve="curveMonotoneX" />
        </FlexibleWidthXYPlot>
      </div>
    </div>
  );
};

export default Chart;
