export const windToKmPerHour = (speed: number) => {
  const hour: number = 60 * 60;
  const km = 1000;

  return (speed * hour) / km;
};
