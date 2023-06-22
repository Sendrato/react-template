export const getCenterOfLocations = (locations: number[][]): [number, number] => {
  let latXTotal = 0;
  let latYTotal = 0;
  let lonDegreesTotal = 0;

  for (let i = 0; i < locations.length; i++) {
    const latDegrees = locations[i][0];
    const lonDegrees = locations[i][1];

    const latRadians = (Math.PI * latDegrees) / 180;
    latXTotal += Math.cos(latRadians);
    latYTotal += Math.sin(latRadians);

    lonDegreesTotal += lonDegrees;
  }

  const finalLatRadians = Math.atan2(latYTotal, latXTotal);
  const finalLatDegrees = (finalLatRadians * 180) / Math.PI;

  const finalLonDegrees = lonDegreesTotal / locations.length;

  return [finalLatDegrees, finalLonDegrees];
};
