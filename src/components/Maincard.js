import { Card, CardContent, Grid, Typography } from '@mui/material';


// Credits to  repository for icons: https://github.com/Makin-Things/weather-icons.git

const MainCard = ({ location, currentdate, type, temperature, humidity, wind, filename }) => {
  return (
    <Card sx={{ minWidth: 200, margin: 1, borderRadius: '10px' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs>
            <div className="icon-container">
              <img alt="Weather" src={process.env.PUBLIC_URL + `/images/animated/${filename}`} width="100%"></img>
            </div>
            <Typography variant="h6">{location}</Typography>
            <Typography color="text.secondary">{type}</Typography>
          </Grid>

          <Grid item xs>
            <Typography variant="h6">{currentdate}</Typography>
            <Typography color="text.secondary">{type}</Typography>
            <Typography>Temp: {temperature}°C</Typography>
            <Typography>Humidity: {humidity}%</Typography>
            <Typography>Wind: {wind} km/h</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MainCard;
