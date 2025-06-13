// WeatherCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WeatherCard = ({ date, type, temperature, humidity, wind }) => {
  return (
    <Card sx={{ minWidth: 200, margin: 1, backgroundColor: '#e3f2fd' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {date}
        </Typography>
        <Typography color="text.secondary">{type}</Typography>
        <Typography>Temp: {temperature}°C</Typography>
        <Typography>Humidity: {humidity}%</Typography>
        <Typography>Wind: {wind} km/h</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
