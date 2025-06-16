import { Card, CardContent, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const MainCard = ({ location, maintemp, weatherStatus, htemp, ltemp, filename }) => {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const stringDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // true if screen is small

  return (
    <Card
      sx={{
        margin: 2,
        borderRadius: '16px',
        fontFamily: 'Roboto',
        boxShadow: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid #ffffff',
        color: 'black',
        backdropFilter: 'blur(6px)',
      }}
    >
      <CardContent>
        <Grid container spacing={3} direction={isMobile ? 'column' : 'row'} alignItems="center" justifyContent="space-between">
          
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <Card style={{borderRadius:'20px', backgroundColor:'#2986cc', padding:'5px'}}>
                <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // centers icon+text on mobile too
                  gap: 1,
                  color:'white',
                  marginRight:'10px'
                }}
              >
                <LocationOnIcon fontSize="small" color="white"  />
                {location}
              </Typography>

              </Card>
              
              <Typography variant="h6" style={{fontSize:'35px'}}>{day}</Typography>
              <Typography variant="body2" color="text.secondary"> {stringDate}</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{maintemp}°</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                H: {htemp}° | L: {ltemp}°
              </Typography>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
      
              <Box sx={{ width: 80, mx: 'auto', mt: 1 }}>
                <img
                  alt="Weather"
                  src={`${process.env.PUBLIC_URL}/images/animated/${filename}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>

              <Typography variant="h6" sx={{ color: 'text.secondary', mt: 1 }}>
                {weatherStatus}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MainCard;


