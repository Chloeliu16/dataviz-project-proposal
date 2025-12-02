// Utility function to preprocess genres
export const preprocessGenres = (data) => {
  // Step 1: Split genres and count frequencies
  const genreCounts = {};
  data.forEach((d) => {
    if (d.genre) {
      const genres = d.genre
        .split(',')
        .map((g) => g.trim());
      genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    }
  });

  // Step 2: Identify top 7 genres
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map((entry) => entry[0]);

  // Step 3: Map each movie to a single simplified genre (take the first genre)
  return data.map((d) => {
    if (!d.genre) {
      return { ...d, genreSimplified: 'Other' };
    }

    const genres = d.genre.split(',').map((g) => g.trim());

    // Take the first genre directly
    const firstGenre = genres[0];

    // Check if the first genre is in the top 7, otherwise use 'Other'
    const primaryGenre = topGenres.includes(firstGenre)
      ? firstGenre
      : 'Other';

    return {
      ...d,
      genreSimplified: primaryGenre,
    };
  });
};
