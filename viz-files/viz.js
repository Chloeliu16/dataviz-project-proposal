import {
  select,
  scaleLinear,
  extent,
  scaleOrdinal,
  schemeTableau10,
  max,
  axisLeft,
  line,
} from 'd3';
import { renderXAxis } from './xAxis.js';
import { renderYAxis } from './yAxis.js';
import { calculateRegression } from './regressionLine.js';

export const viz = (
  selection,
  {
    data,
    xValue,
    yValue,
    rValue,
    fill,
    width,
    height,
    margin,
    xLabel,
    yLabel,
    xlabelOffset = 10,
    ylabelOffset = 40,
    xTickFormat = '.1f',
    title,
    allGenres,
    colorScale,
    xScale,
    yScale,
    innerWidth,
    innerHeight,
    showRegression = false,
    activeGenre = null,
    xDomain = null,
    yDomain = null,
    showTrendLines = false,
    onToggleTrendLines = null,
    supportsRegression = true,
  },
) => {
  // Filter out null values from y axis
  const filteredData = data.filter(
    (d) => yValue(d) !== null,
  );

  // Set domains
  if (xDomain) {
    xScale.domain(xDomain);
  } else {
    xScale.domain([8.0, 9.3]);
  }

  if (yDomain) {
    yScale.domain(yDomain);
  } else {
    yScale.domain([
      0,
      max([240, max(filteredData, yValue)]),
    ]);
  }

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
  g.selectAll('.decade-label').remove();
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

  // Style grid lines
  grid
    .selectAll('line')
    .attr('stroke', '#ccc')
    .attr('stroke-opacity', 0.5)
    .attr('shape-rendering', 'crispEdges');

  // Remove grid axis path
  grid.selectAll('path').remove();

  // Draw regression lines for each genre
  const regressionLinesGroup = g
    .selectAll('.regression-lines-group')
    .data([null])
    .join('g')
    .attr('class', 'regression-lines-group');

  // Show regression lines if showRegression is true OR if hovering over a genre
  // BUT only if the chart supports regression
  if (
    (showRegression || activeGenre) &&
    supportsRegression
  ) {
    // Calculate regression for each genre
    const genreRegressions = [];
    allGenres.forEach((genre) => {
      // If activeGenre is set, only include that genre's regression
      if (activeGenre && genre !== activeGenre) {
        return;
      }

      const genreData = filteredData.filter(
        (d) => fill(d) === genre,
      );
      const regression = calculateRegression(
        genreData,
        (d) => xValue(d),
        (d) => yValue(d),
      );
      if (regression) {
        genreRegressions.push({ genre, regression });
      }
    });

    // Draw regression lines
    regressionLinesGroup
      .selectAll('line')
      .data(genreRegressions, (d) => d.genre)
      .join('line')
      .attr('x1', () => {
        const domain = xScale.domain();
        return xScale(domain[0]);
      })
      .attr('y1', (d) => {
        const domain = xScale.domain();
        return yScale(
          d.regression.slope * domain[0] +
            d.regression.intercept,
        );
      })
      .attr('x2', () => {
        const domain = xScale.domain();
        return xScale(domain[1]);
      })
      .attr('y2', (d) => {
        const domain = xScale.domain();
        return yScale(
          d.regression.slope * domain[1] +
            d.regression.intercept,
        );
      })
      .attr('stroke', (d) => colorScale(d.genre))
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.7)
      .attr('pointer-events', 'none');
  } else {
    // Remove regression lines when not shown
    regressionLinesGroup.selectAll('line').remove();
  }

  // Handle trend lines for year vs rating chart
  if (showTrendLines && onToggleTrendLines) {
    // Group data by genre and decade
    const groupedData = {};
    filteredData.forEach((d) => {
      const decade = Math.floor(xValue(d) / 10) * 10;
      if (!groupedData[fill(d)]) {
        groupedData[fill(d)] = {};
      }
      if (!groupedData[fill(d)][decade]) {
        groupedData[fill(d)][decade] = {
          ratings: [],
          year: decade,
          genre: fill(d),
        };
      }
      groupedData[fill(d)][decade].ratings.push(yValue(d));
    });

    // Calculate averages
    const decadeAverages = [];
    Object.keys(groupedData).forEach((genre) => {
      Object.keys(groupedData[genre]).forEach((decade) => {
        const ratings = groupedData[genre][decade].ratings;
        const average =
          ratings.reduce((sum, r) => sum + r, 0) /
          ratings.length;
        decadeAverages.push({
          year: +decade,
          rating: average,
          genre: genre,
        });
      });
    });

    // Group by genre for line rendering
    const lineData = {};
    decadeAverages.forEach((d) => {
      if (!lineData[d.genre]) lineData[d.genre] = [];
      lineData[d.genre].push(d);
    });

    // Sort each genre's data by year
    Object.keys(lineData).forEach((genre) => {
      lineData[genre].sort((a, b) => a.year - b.year);
    });

    // Create line generator
    const lineGenerator = line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.rating));

    // Render trend lines with hover effects
    const trendLines = g
      .selectAll('.trend-line')
      .data(Object.entries(lineData), ([genre]) => genre)
      .join('path')
      .attr('class', 'trend-line')
      .attr('d', ([, points]) => lineGenerator(points))
      .attr('fill', 'none')
      .attr('stroke', ([genre]) => colorScale(genre))
      .attr('stroke-width', ([genre]) => {
        if (activeGenre === null) {
          return 2;
        }
        return activeGenre === genre ? 4 : 1.5;
      })
      .attr('stroke-opacity', ([genre]) => {
        if (activeGenre === null) {
          return 0.7;
        }
        return activeGenre === genre ? 1 : 0.3;
      })
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Add value labels for each decade on trend lines (only when hovering over a specific genre)
    if (activeGenre !== null) {
      const decadeLabels = g
        .selectAll('.decade-label')
        .data(
          decadeAverages.filter(
            (d) => d.genre === activeGenre,
          ),
          (d) => `${d.genre}-${d.year}`,
        )
        .join('text')
        .attr('class', 'decade-label')
        .attr('x', (d) => xScale(d.year))
        .attr('y', (d) => yScale(d.rating) - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-family', 'sans-serif')
        .attr('font-weight', '600')
        .attr('fill', (d) => colorScale(d.genre))
        .attr('opacity', 0.95)
        .attr('pointer-events', 'none')
        .text((d) => d.rating.toFixed(2));
    } else {
      // Remove decade labels when showing all trend lines
      g.selectAll('.decade-label').remove();
    }

    // Update circle opacity for trend line mode
    g.selectAll('circle').attr('fill-opacity', (d) => {
      if (activeGenre === null) {
        return 0.2;
      }
      return fill(d) === activeGenre ? 0.3 : 0.05;
    });
  } else {
    // Remove trend lines and labels when not shown
    g.selectAll('.trend-line').remove();
    g.selectAll('.decade-label').remove();
  }

  // Draw bubbles with fixed radius
  const circles = g
    .selectAll('circle')
    .data(filteredData, (d, i) => i)
    .join('circle')
    .attr('cx', (d) => xScale(xValue(d)))
    .attr('cy', (d) => yScale(yValue(d)))
    .attr('r', 4.2)
    .attr('fill', (d) => colorScale(fill(d)))
    .attr('fill-opacity', (d) => {
      if (showTrendLines && onToggleTrendLines) {
        if (activeGenre === null) {
          return 0.2;
        }
        return fill(d) === activeGenre ? 0.3 : 0.05;
      }
      if (activeGenre === null) {
        return 0.7;
      }
      return fill(d) === activeGenre ? 0.7 : 0.1;
    });

  // Add hover functionality to show movie name, director, and release year
  circles
    .on('mouseover', function (event, d) {
      const tooltipGroup = selection
        .selectAll('.tooltip-group')
        .data([d])
        .join('g')
        .attr('class', 'tooltip-group');

      const tooltipContent = `${d.name} (${d.directors.split(',')[0]}, ${d.year})`;

      const isLowRating =
        xValue(d) <= xScale.domain()[0] + 0.1;
      const isHighRating =
        xValue(d) >= xScale.domain()[1] - 0.1;

      let tooltipX, tooltipY, textAnchor;

      if (isHighRating) {
        tooltipX = xScale(xValue(d)) + margin.left - 10;
        tooltipY = yScale(yValue(d)) + margin.top - 10;
        textAnchor = 'end';
      } else if (isLowRating) {
        tooltipX = xScale(xValue(d)) + margin.left + 10;
        tooltipY = yScale(yValue(d)) + margin.top - 10;
        textAnchor = 'start';
      } else {
        tooltipX = xScale(xValue(d)) + margin.left;
        tooltipY = yScale(yValue(d)) + margin.top - 13;
        textAnchor = 'middle';
      }

      const tooltipText = tooltipGroup
        .selectAll('.tooltip')
        .data([d])
        .join('text')
        .attr('class', 'tooltip')
        .attr('x', tooltipX)
        .attr('y', tooltipY)
        .attr('text-anchor', textAnchor)
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
        .attr('fill-opacity', 0.5)
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('rx', 3)
        .attr('ry', 3);
    })
    .on('mouseout', function (event, d) {
      selection.selectAll('.tooltip-group').remove();
    });

  renderXAxis(g, {
    xScale,
    innerHeight,
    innerWidth,
    xLabel,
    xlabelOffset,
    xTickFormat,
  });
  renderYAxis(g, {
    yScale,
    innerHeight,
    yLabel,
    ylabelOffset,
  });
};
