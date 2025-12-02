import { parseRuntime } from './parseRuntime.js';
import { preprocessGenres } from './genrePreprocessor.js';

// We need to store the processed data globally to avoid re-processing
let processedData = null;

export const parseMovieData = (d) => ({
  ...d,
  year: +d.year,
  rating: +d.rating,
  run_time: parseRuntime(d.run_time),
  budget:
    d.budget === 'Not Available'
      ? null
      : +d.budget.replace(/[$,]/g, ''),
  box_office:
    d.box_office === 'Not Available'
      ? null
      : +d.box_office.replace(/[$,]/g, ''),
});

// Function to initialize and preprocess genre data
export const initializeData = (rawData) => {
  if (!processedData) {
    processedData = preprocessGenres(rawData);
  }
  return processedData;
};
