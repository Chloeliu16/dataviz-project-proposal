import { extent, max } from 'd3';

// Helper function to aggregate data by runtime bins and count movies
const aggregateByRuntimeBins = (
  data,
  binSize = 10,
  startFrom = 40,
) => {
  const bins = {};
  const genreSet = new Set();

  // First pass: collect all genres and create bins
  data.forEach((d) => {
    if (d.run_time === null) return;

    // Calculate bin start, ensuring we don't go below startFrom
    let binStart =
      Math.floor(d.run_time / binSize) * binSize;
    if (binStart < startFrom) {
      binStart = startFrom;
    }

    const binKey = binStart; // Use bin start as key instead of midpoint

    if (!bins[binKey]) {
      bins[binKey] = { run_time: binKey };
    }

    const genre = d.genreSimplified;
    genreSet.add(genre);
    bins[binKey][genre] = (bins[binKey][genre] || 0) + 1;
  });

  // Find the maximum runtime in the dataset
  const validRuntimes = data
    .filter((d) => d.run_time !== null)
    .map((d) => d.run_time);

  if (validRuntimes.length === 0) {
    return [];
  }

  const maxRuntime = Math.max(...validRuntimes);
  const maxBinStart =
    Math.floor(maxRuntime / binSize) * binSize;

  // Create all bins from startFrom to maxBinStart (including empty ones)
  for (let i = startFrom; i <= maxBinStart; i += binSize) {
    if (!bins[i]) {
      bins[i] = { run_time: i };
    }
  }

  // Initialize all genres to 0 for all bins
  const result = Object.values(bins).map((bin) => {
    genreSet.forEach((genre) => {
      if (bin[genre] === undefined) {
        bin[genre] = 0;
      }
    });
    return bin;
  });

  return result.sort((a, b) => a.run_time - b.run_time);
};

// Helper function to aggregate data by genre and count movies
const aggregateByGenre = (data) => {
  const genreCounts = {};

  data.forEach((d) => {
    const genre = d.genreSimplified;
    if (!genreCounts[genre]) {
      genreCounts[genre] = 0;
    }
    genreCounts[genre]++;
  });

  return Object.entries(genreCounts)
    .map(([genre, count]) => ({
      genre,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const CHART_CONFIGS = {
  runtime_rating: {
    id: 'runtime_rating',
    label: 'Rating VS Runtime',
    title:
      'IMDB Top 250 Movies Scatter Plot: Rating VS Runtime',
    xValue: (d) => d.rating,
    yValue: (d) => d.run_time,
    xLabel: 'Rating',
    yLabel: 'Run Time (minutes)',
    xTickFormat: '.1f',
    supportsRegression: true,
    getDomain: (filteredData) => {
      const filtered = filteredData.filter(
        (d) => d.run_time !== null,
      );
      return {
        xDomain: [8.0, 9.3],
        yDomain: [
          0,
          max([240, max(filtered, (d) => d.run_time)]),
        ],
      };
    },
  },
  runtime_year: {
    id: 'runtime_year',
    label: 'Year VS Rating',
    title:
      'IMDB Top 250 Movies Scatter Plot: Year VS Rating',
    xValue: (d) => d.year,
    yValue: (d) => d.rating,
    xLabel: 'Year',
    yLabel: 'Rating',
    xTickFormat: 'd',
    supportsRegression: false,
    showTrendLines: true,
    getDomain: (filteredData) => {
      const xExt = extent(filteredData, (d) => d.year);
      return {
        xDomain: [xExt[0] - 1, xExt[1] + 1],
        yDomain: [7.8, 9.5],
      };
    },
  },
  budget_rating: {
    id: 'budget_rating',
    label: 'Runtime VS Number',
    title:
      'IMDB Top 250 Movies Distribution of Movie Runtimes',
    xValue: (d) => d.run_time,
    yLabel: 'Numbers of Movies',
    xLabel: 'Runtime (minutes)',
    xTickFormat: 'd',
    xlabelOffset: 40,
    supportsRegression: false,
    isStackedBar: true,
    getDomain: (filteredData) => {
      const filtered = filteredData.filter(
        (d) => d.run_time !== null,
      );
      const aggregated = aggregateByRuntimeBins(
        filtered,
        10,
        40,
      );

      if (aggregated.length === 0) {
        return {
          xDomain: [40, 300],
          yDomain: [0, 10],
        };
      }

      return {
        xDomain: null,
        yDomain: null,
      };
    },
    // Transform data before visualization
    transformData: (data) =>
      aggregateByRuntimeBins(data, 10, 40),
  },
  boxoffice_rating: {
    id: 'boxoffice_rating',
    label: 'Genre VS Count',
    title: 'IMDB Top 250 Movies Bar Chart: Genre VS Count',
    xValue: (d) => d.genre,
    yValue: (d) => d.count,
    xLabel: 'Genre',
    yLabel: 'Count',
    xTickFormat: 'd',
    supportsRegression: false,
    isBar: true,
    getDomain: (filteredData) => {
      return {
        xDomain: null,
        yDomain: null,
      };
    },
    transformData: (data) => aggregateByGenre(data),
  },
  hierarchy_tree: {
    id: 'hierarchy_tree',
    label: 'Hierarchy Tree',
    title: ' ',
    isHierarchyTree: true,
    getDomain: () => ({
      xDomain: null,
      yDomain: null,
    }),
  },
};
