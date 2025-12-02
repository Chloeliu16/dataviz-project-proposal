export const parseRuntime = (runtimeString) => {
  if (!runtimeString || runtimeString === 'Not Available') {
    return null;
  }

  const hoursMatch = runtimeString.match(/(\d+)h/);
  const minutesMatch = runtimeString.match(/(\d+)m/);

  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const minutes = minutesMatch
    ? parseInt(minutesMatch[1])
    : 0;

  return hours * 60 + minutes;
};
