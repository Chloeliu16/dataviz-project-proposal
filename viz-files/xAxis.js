import { axisBottom, format } from 'd3';

export const renderXAxis = (
  container,
  {
    xScale,
    innerHeight,
    innerWidth,
    xLabel,
    xlabelOffset,
    xTickFormat = '.1f',
  },
) => {
  // Add or update X axis
  const xAxis = container
    .selectAll('.x-axis')
    .data([null])
    .join('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(
      axisBottom(xScale).tickFormat(format(xTickFormat)),
    );

  // Style x-axis ticks
  xAxis
    .selectAll('text')
    .attr('font-size', '14px')
    .attr('font-family', 'sans-serif')
    .attr('fill', '#333'); // Darker tick text color

  // Style x-axis path and ticks
  xAxis.selectAll('path, line').attr('stroke', '#333'); // Darker axis lines

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
