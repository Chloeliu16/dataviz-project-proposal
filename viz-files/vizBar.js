import {
  select,
  scaleLinear,
  scaleBand,
  axisLeft,
  axisBottom,
  max,
} from 'd3';
import { renderYAxis } from './yAxis.js';

export const vizBar = (
  selection,
  {
    data,
    xValue,
    yValue,
    width,
    height,
    margin,
    xLabel,
    yLabel,
    xlabelOffset = 10,
    ylabelOffset = 40,
    title,
    colorScale,
    innerWidth,
    innerHeight,
  },
) => {
  // Calculate total for percentage calculation
  const total = data.reduce((sum, d) => sum + yValue(d), 0);

  // Create scales
  const xScale = scaleBand()
    .domain(data.map((d) => xValue(d)))
    .range([0, innerWidth])
    .padding(0.2);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => yValue(d)) || 10])
    .range([innerHeight, 0]);

  // Create a group element for the visualization with margins
  const g = selection
    .selectAll('g.container')
    .data([null])
    .join('g')
    .attr('class', 'container')
    .attr(
      'transform',
      `translate(${margin.left}, ${margin.top})`,
    );

  // Clear ALL previous visualization elements from any chart type
  g.selectAll('circle').remove();
  g.selectAll('.bar').remove();
  g.selectAll('.stack-group').remove();
  g.selectAll('.regression-lines-group').remove();
  g.selectAll('.trend-line').remove();
  selection.selectAll('.tooltip-group').remove();

  // Add horizontal grid lines
  const yAxisGrid = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickFormat('');

  const grid = g
    .selectAll('.grid')
    .data([null])
    .join('g')
    .attr('class', 'grid')
    .call(yAxisGrid);

  grid
    .selectAll('line')
    .attr('stroke', '#ccc')
    .attr('stroke-opacity', 0.5)
    .attr('shape-rendering', 'crispEdges');

  grid.selectAll('path').remove();

  // Draw bars
  const bars = g
    .selectAll('.bar')
    .data(data, (d) => xValue(d))
    .join('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(xValue(d)))
    .attr('y', (d) => yScale(yValue(d)))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => innerHeight - yScale(yValue(d)))
    .attr('fill', (d) => colorScale(xValue(d)))
    .attr('fill-opacity', 0.8)
    .on('mouseover', function (event, d) {
      select(this).attr('fill-opacity', 1);

      const tooltipGroup = selection
        .selectAll('.tooltip-group')
        .data([d])
        .join('g')
        .attr('class', 'tooltip-group');

      const count = yValue(d);
      const percentage =
        total > 0 ? ((count / total) * 100).toFixed(1) : 0;
      const tooltipContent = `${xValue(d)}: ${count} (${percentage}%)`;

      const tooltipX =
        xScale(xValue(d)) +
        margin.left +
        xScale.bandwidth() / 2;
      const tooltipY = yScale(yValue(d)) + margin.top - 10;

      const tooltipText = tooltipGroup
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('x', tooltipX)
        .attr('y', tooltipY)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('fill', '#000')
        .text(tooltipContent);

      const bbox = tooltipText.node().getBBox();
      const padding = { x: 4, y: 2 };

      tooltipGroup
        .selectAll('.tooltip-bg')
        .data([d])
        .join('rect')
        .attr('class', 'tooltip-bg')
        .attr('x', bbox.x - padding.x)
        .attr('y', bbox.y - padding.y)
        .attr('width', bbox.width + padding.x * 2)
        .attr('height', bbox.height + padding.y * 2)
        .attr('fill', 'white')
        .attr('fill-opacity', 0.9)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('rx', 3)
        .attr('ry', 3);

      tooltipText.raise();
    })
    .on('mouseout', function (event, d) {
      select(this).attr('fill-opacity', 0.8);
      selection.selectAll('.tooltip-group').remove();
    });

  // Add X axis
  const xAxis = g
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
    .attr('y', xlabelOffset + 25)
    .attr('text-anchor', 'middle')
    .attr('fill', '#333')
    .attr('font-size', '16px')
    .attr('font-family', 'sans-serif')
    .text(xLabel || '');

  // Add Y axis
  renderYAxis(g, {
    yScale,
    innerHeight,
    yLabel,
    ylabelOffset,
  });
};
