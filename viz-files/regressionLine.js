/**
 * Calculate linear regression for a dataset
 * y = slope * x + intercept
 */
export const calculateRegression = (
  data,
  xAccessor,
  yAccessor,
) => {
  if (data.length < 2) return null;

  // Filter out any points with null values
  const validData = data.filter(
    (d) => xAccessor(d) != null && yAccessor(d) != null,
  );

  if (validData.length < 2) return null;

  const n = validData.length;
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0;

  validData.forEach((d) => {
    const x = xAccessor(d);
    const y = yAccessor(d);
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  });

  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return null;

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};
