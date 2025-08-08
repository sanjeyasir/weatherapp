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
import { emojiPairs, getTodaySeed, shuffleWithSeed } from './util';
import GameComponent from './GameComponent';

function Game() {
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [disableClick, setDisableClick] = useState(false);

  useEffect(() => {
    const seed = getTodaySeed();
    const shuffled = shuffleWithSeed(emojiPairs, seed);
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first] === cards[second]) {
        setMatchedIndices((prev) => [...prev, first, second]);
        setFlippedIndices([]);
      } else {
        setDisableClick(true);
        setTimeout(() => {
          setFlippedIndices([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  const handleClick = (index) => {
    if (disableClick) return;
    if (flippedIndices.includes(index) || matchedIndices.includes(index)) return;
    if (flippedIndices.length === 2) return;

    setFlippedIndices((prev) => [...prev, index]);
  };

  const hasWon = matchedIndices.length === cards.length && cards.length > 0;

  

  return (
    <>

     {loadingBackdrop && (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingBackdrop}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
      )}

     <Box 
       sx={{
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wrap on small, row on medium+
        width: '100%',
        margin: 0,
        padding: 2.5,
        boxSizing: 'border-box',
      }}
      >
      <NavCard/>
    </Box>

    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>EmojiMatch Daily</h1>
      <p>Find all matching pairs! Game resets daily.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 100px)',
          justifyContent: 'center',
          gap: 10,
          marginTop: 20,
        }}
      >
        {cards.map((emoji, i) => (
          <GameComponent
            key={i}
            emoji={emoji}
            isFlipped={flippedIndices.includes(i)}
            isMatched={matchedIndices.includes(i)}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      {hasWon && <h2 style={{ color: '#4caf50', marginTop: 30 }}>🎉 You matched all pairs! 🎉</h2>}
    </div>
    </>
    
    
  );
};



export default Game;
   