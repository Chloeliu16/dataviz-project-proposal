import { axisLeft } from 'd3';

export const renderYAxis = (
  container,
  { yScale, innerHeight, yLabel, ylabelOffset },
) => {
  // Add or update Y axis
  const yAxis = container
    .selectAll('.y-axis')
    .data([null])
    .join('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale));

  // Style y-axis ticks
  yAxis
    .selectAll('text')
    .attr('font-size', '14px')
    .attr('font-family', 'sans-serif')
    .attr('fill', '#333'); // Darker tick text color

  // Style y-axis path and ticks
  yAxis.selectAll('path, line').attr('stroke', '#333'); // Darker axis lines

  // Add Y axis label
  yAxis
    .selectAll('.y-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -ylabelOffset + 5)
    .attr('text-anchor', 'middle')
    .attr('fill', '#333')
    .attr('font-size', '16px')
    .attr('font-family', 'sans-serif')
    .text(yLabel || '');
};
