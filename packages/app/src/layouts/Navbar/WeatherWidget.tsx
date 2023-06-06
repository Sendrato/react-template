import AirIcon from '@mui/icons-material/Air';
import { Box, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { windToKmPerHour } from 'utils';

interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<null | IWeather>();

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';

  const fetchWeather = useCallback(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-33.8679&lon=151.2073&appid=${API_KEY}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setWeather(result);
        },
        (error) => {
          console.error(error);
        },
      );
  }, [API_KEY]);

  const roundNumber = (num: number | undefined) =>
    num !== undefined ? Math.round(num) : null;

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  useEffect(() => {
    setInterval(() => fetchWeather(), 1.2e6);
  }, [fetchWeather]);

  if (!weather) return null;

  return (
    <Box display={'flex'} marginLeft={'-8px'}>
      <Typography
        variant="body1"
        display={'flex'}
        alignItems={'center'}
        color={'black'}
        marginRight={'1rem'}
      >
        <Image
          alt="weather"
          src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
        />
        {roundNumber(weather?.main?.temp)}°C
      </Typography>
      <Typography
        variant="body1"
        display={'flex'}
        alignItems={'center'}
        color={'black'}
      >
        <AirIcon sx={{ color: 'grey', marginRight: '0.5rem' }} />
        {roundNumber(windToKmPerHour(weather?.wind?.speed))}km/hour
      </Typography>
    </Box>
  );
};

const Image = styled.img`
  height: 35px;
  width: 35px;
`;

export default WeatherWidget;
