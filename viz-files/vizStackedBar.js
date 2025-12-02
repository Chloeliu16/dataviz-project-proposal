import {
  select,
  scaleLinear,
  stack,
  stackOrderNone,
  stackOffsetNone,
  axisLeft,
  axisBottom,
  max,
} from 'd3';
import { renderYAxis } from './yAxis.js';

export const vizStackedBar = (
  selection,
  {
    data,
    xValue,
    width,
    height,
    margin,
    xLabel,
    yLabel,
    xlabelOffset = 10,
    ylabelOffset = 40,
    title,
    allGenres,
    colorScale,
    innerWidth,
    innerHeight,
  },
) => {
  // Determine bin size and start from data
  let binSize = 10;
  let startFrom = 40;
  if (data.length > 1) {
    binSize = xValue(data[1]) - xValue(data[0]);
  }
  if (data.length > 0) {
    startFrom = xValue(data[0]);
  }

  const maxBinStart =
    data.length > 0
      ? xValue(data[data.length - 1])
      : startFrom;
  const maxRuntime = maxBinStart + binSize;

  // Create scales - using linear scale for x to properly represent ranges
  const xScale = scaleLinear()
    .domain([startFrom, maxRuntime])
    .range([0, innerWidth]);

  // Calculate max sum for y domain
  const maxSum = max(data, (d) => {
    let sum = 0;
    allGenres.forEach((genre) => {
      const val = d[genre];
      if (typeof val === 'number') sum += val;
    });
    return sum;
  });

  const yScale = scaleLinear()
    .domain([0, maxSum || 10])
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

  // Stack data
  const stackGenerator = stack()
    .keys(allGenres)
    .order(stackOrderNone)
    .offset(stackOffsetNone);

  const stackedData = stackGenerator(data);

  // Draw stacked bars
  const groups = g
    .selectAll('.stack-group')
    .data(stackedData, (d) => d.key)
    .join('g')
    .attr('class', 'stack-group')
    .attr('fill', (d) => colorScale(d.key));

  groups
    .selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d) => xScale(xValue(d.data)))
    .attr('y', (d) => yScale(d[1]))
    .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
    .attr(
      'width',
      (d) =>
        xScale(xValue(d.data) + binSize) -
        xScale(xValue(d.data)),
    )
    .attr('fill-opacity', 0.8)
    .on('mouseover', function (event, d) {
      const genre = select(this.parentNode).datum().key;
      const count = d[1] - d[0];
      const runtime = xValue(d.data);
      const barWidth =
        xScale(runtime + binSize) - xScale(runtime);

      const tooltipGroup = selection
        .selectAll('.tooltip-group')
        .data([d])
        .join('g')
        .attr('class', 'tooltip-group');

      const tooltipContent = `${genre}: ${Math.round(count)}`;

      const tooltipX =
        xScale(runtime) + margin.left + barWidth / 2;
      const tooltipY =
        yScale(d[1]) +
        margin.top -
        (yScale(d[0]) - yScale(d[1])) / 2;

      const tooltipText = tooltipGroup
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('x', tooltipX)
        .attr('y', tooltipY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
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
        .attr('fill-opacity', 0.8)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('rx', 3)
        .attr('ry', 3);

      tooltipText.raise();
    })
    .on('mouseout', function (event, d) {
      selection.selectAll('.tooltip-group').remove();
    });

  // Calculate tick values with 10-minute intervals
  const tickValues = [];
  for (let i = startFrom; i <= maxRuntime; i += 10) {
    tickValues.push(i);
  }

  // Add X axis
  const xAxis = g
    .selectAll('.x-axis')
    .data([null])
    .join('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(axisBottom(xScale).tickValues(tickValues));

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

  renderYAxis(g, {
    yScale,
    innerHeight,
    yLabel,
    ylabelOffset,
  });
};
