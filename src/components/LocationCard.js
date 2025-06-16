import { Card, CardContent, Grid, Typography, Box } from '@mui/material';

const LocationCard = ({ maintemp,weatherStatus, filename, date}) => {
  return (
   

<Card
  sx={{
    minWidth: 250,
    minHeight: 50,
    margin: 1,
    borderRadius: '8px',
    fontFamily: 'Roboto',
    boxShadow: 3,
    display: 'flex',
    alignItems: 'center',
    paddingY: 2, // replaces top & bottom padding
  }}
>
  <CardContent sx={{ width: '100%', padding: '10px !important', marginTop:'10px',marginBottom:'10px'}}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        margin:'10px'
        
      }}
    >
      {/* Weather Icon */}
      <Box sx={{ width: 50, height: 50, flexShrink: 0 , marginTop:'10px'}}>
        <img
          alt="Weather"
          src={`${process.env.PUBLIC_URL}/images/animated/${filename}`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>

      {/* Weather Info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 , marginTop:'10px'}}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {date}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {weatherStatus}
        </Typography>
      </Box>

      {/* Temperature */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right', minWidth: 40 }}>
        {maintemp}°
      </Typography>
    </Box>
  </CardContent>
</Card>



  );
};

export default LocationCard;


