import { axisBottom } from 'd3';

export const renderXAxisBand = (
  container,
  { xScale, innerHeight, innerWidth, xLabel, xlabelOffset },
) => {
  // Add or update X axis for band scale
  const xAxis = container
    .selectAll('.x-axis')
    .data([null])
    .join('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(axisBottom(xScale));

  // Style x-axis ticks
  xAxis
    .selectAll('text')
    .attr('font-size', '12px')
    .attr('font-family', 'sans-serif')
    .attr('fill', '#333')
    .attr('text-anchor', 'middle');

  // Style x-axis path and ticks
  xAxis.selectAll('path, line').attr('stroke', '#333');

  // Add X axis label
  xAxis
    .selectAll('.x-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'x-axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', xlabelOffset)
    .attr('text-anchor', 'middle')
    .attr('fill', '#333')
    .attr('font-size', '16px')
    .attr('font-family', 'sans-serif')
    .text(xLabel || '');
};
