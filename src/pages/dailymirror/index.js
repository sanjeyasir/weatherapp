import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import NavCard from '../../components/NavComponent';

const NewsList = ({ rssUrl }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const extractImageUrl = (html) => {
    const match = html?.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          rssUrl
        )}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
          setArticles(data.items.slice(0, 10));
        } else {
          console.error('Failed to fetch RSS feed:', data.message);
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching RSS:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchRSS();
  }, [rssUrl]);

  if (loading) {
    return (
      <Box textAlign="center" py={3}>
        <CircularProgress />
        <Typography mt={2}>Loading news...</Typography>
      </Box>
    );
  }

  if (articles.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center" mt={3}>
        No news articles available.
      </Typography>
    );
  }

  return (
    <Box>
      {articles.map((item, idx) => {
        const imageUrl = item.enclosure?.link || extractImageUrl(item.description);
        const cleanDescription = item.description?.replace(/<[^>]+>/g, '') || '';

        return (
          <Card key={idx} sx={{ display: 'flex', mb: 3 }}>
            {imageUrl && (
              <CardMedia
                component="img"
                sx={{ width: 160, objectFit: 'cover' }}
                image={imageUrl}
                alt="News"
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  variant="h6"
                  color="primary"
                  fontWeight="bold"
                >
                  {item.title}
                </Link>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {new Date(item.pubDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {cleanDescription.slice(0, 180)}...
                </Typography>
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

function DailyMirrorTabbedNews() {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const feeds = [
    {
      label: 'Breaking News',
      url: 'https://www.dailymirror.lk/rss/breaking_news/108',
    },
    {
      label: "Today's Headlines",
      url: 'https://www.dailymirror.lk/rss/todays_headlines/419',
    },
    {
      label: 'Business News',
      url: 'https://www.dailymirror.lk/rss/business_24_7/395',
    },
    {
      label: 'Cartoon of the Day',
      url: 'https://www.dailymirror.lk/rss/cartoon_of_the_day/167',
    },    
  ];

  return (

   <>
  <Box
    sx={{
      display: 'flex',
      flexWrap: { xs: 'wrap', md: 'nowrap' },
      width: '100%',
      margin: 0,
      padding: 2.5,
      boxSizing: 'border-box',
    }}
  >
    <NavCard />
  </Box>

  {/* Banner with overlay */}
  <Box
    sx={{
      display: 'flex',
      flexWrap: { xs: 'wrap', md: 'nowrap' },
      width: '100%',
      margin: 0,
      padding: 2.5,
      height: '250px',
      borderRadius: '10px',
      boxSizing: 'border-box',
    }}
  >
    <img
      src="../../DailymirrorLogo.jpg"
      alt="Daily Mirror Logo"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '10px',
        filter: 'brightness(0.5)', // Optional: darken background for better readability
      }}
    />
  </Box>

  {/* Tab navigation and News content */}
  <Box p={3}>
    <Tabs
      value={tabIndex}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        mb: 3,
        '& .MuiTabs-indicator': {
          display: 'none',
        },
        '& .MuiTabs-flexContainer': {
          gap: 1,
          flexWrap: 'wrap',
        },
      }}
    >
      {feeds.map((feed, idx) => (
        <Tab
          key={idx}
          label={feed.label}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            padding: '6px 16px',
            fontWeight: '600',
            fontSize: '0.9rem',
            color: 'primary.main',
            border: '1.5px solid',
            borderColor: idx === tabIndex ? 'primary.main' : 'transparent',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
            minWidth: 'auto',
            '&.Mui-selected': {
              textDecoration: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              textDecoration: 'none',
            },
          }}
        />
      ))}
    </Tabs>

    <NewsList rssUrl={feeds[tabIndex].url} />
  </Box>
   </>

  );
}

export default DailyMirrorTabbedNews;
   