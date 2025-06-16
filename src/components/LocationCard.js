import { Card, CardContent, Grid, Typography, Box } from '@mui/material';

const LocationCard = ({ maintemp, filename, date}) => {
  return (
    <Card
      sx={{
        minWidth: 100,
        margin: 1,
        borderRadius: '20px',
        textAlign: 'center',
        fontFamily: 'Roboto',
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Grid container direction="column" alignItems="center" spacing={1}>

           {/* Weather Status */}
          <Grid item>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              {date}
            </Typography>
          </Grid>
          
          {/* Location and Icon */}
          <Grid item>
            <Box sx={{ width: 50, mx: 'auto', mt: 1 }}>
              <img
                alt="Weather"
                src={`${process.env.PUBLIC_URL}/images/animated/${filename}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>

          {/* Main Temperature */}
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {maintemp}°
            </Typography>
          </Grid>

         

        </Grid>
      </CardContent>
    </Card>
  );
};

export default LocationCard;


