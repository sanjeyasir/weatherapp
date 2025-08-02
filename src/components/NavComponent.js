import { Card, CardContent, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; 

const NavCard = () => {
  const navigate = useNavigate();



const buttons = [
  { label: 'Weather', icon: <WbSunnyIcon fontSize="small" />, path: '/' },
  { label: 'Daily Mirror 🇱🇰', icon: <ArticleIcon fontSize="small" />, path: '/news/dailymirrorlk' }
];


  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '8px',
        fontFamily: 'Roboto',
        boxShadow: 3,
        paddingY: 1,
      }}
    >
      <CardContent sx={{ padding: '8px !important' }}>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            overflowX: 'auto',
            paddingX: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {buttons.map((btn, index) => (
            <Button
              key={index}
              onClick={() => navigate(btn.path)}
              sx={{
                flexShrink: 0,
                minWidth: { xs: 70, sm: 90 },
                maxWidth: { xs: 100 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textTransform: 'none',
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: { xs: '6px', sm: '8px' },
                backgroundColor: '#f9f9f9',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {btn.icon}
              <Typography variant="caption" sx={{ mt: 0.5, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                {btn.label}
              </Typography>
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NavCard;


