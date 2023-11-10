import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlotApp = () => {
  // Replace this with your actual list of question lengths
  const questionLengths = [20, 25, 30, 40, 22, 35, 27, 50];

  const data = [
    {
      type: 'box',
      y: questionLengths,
      boxpoints: 'all',
      jitter: 0.3,
      pointpos: -1.8,
      marker: { color: 'rgba(255, 144, 14, 0.5)' },
      line: { color: 'rgba(255, 144, 14, 1)' },
    },
  ];

  const layout = {
    title: 'Box Plot of Question Lengths',
    yaxis: { title: 'Question Length' },
  };

  return (
    <div>
      <h1>My React Boxplot App</h1>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default BoxPlotApp;