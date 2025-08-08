import { Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import NavCard from '../../components/NavComponent';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
];
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);

  const touchStart = useRef(null);

  // Place food randomly on the board, avoiding snake positions
  function randomFoodPosition() {
    while (true) {
      const newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        return newFood;
      }
    }
  }

  // Move snake every 150ms
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const move = DIRECTIONS[direction];
        const newHead = { x: head.x + move.x, y: head.y + move.y };

        // Check collisions with walls
        if (
          newHead.x < 0 || newHead.x >= BOARD_SIZE ||
          newHead.y < 0 || newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check collisions with self
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        let newSnake;

        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          // Grow snake by adding new head without removing tail
          newSnake = [newHead, ...prevSnake];
          setFood(randomFoodPosition());
        } else {
          // Move snake by adding new head and removing tail
          newSnake = [newHead, ...prevSnake.slice(0, -1)];
        }
        return newSnake;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, snake]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Touch swipe controls
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < 10) return; // ignore tiny swipes

    if (absDx > absDy) {
      if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
      else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
    } else {
      if (dy > 0 && direction !== 'UP') setDirection('DOWN');
      else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
    }
    touchStart.current = null;
  };

  // Restart game
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    setFood(randomFoodPosition());
    setGameOver(false);
  };

  // Render board grid cells
  const cells = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const isSnake = snake.some(seg => seg.x === x && seg.y === y);
      const isFood = food.x === x && food.y === y;

      cells.push(
        <div
          key={`${x}-${y}`}
          style={{
            width: 20,
            height: 20,
            border: '1px solid #ddd',
            backgroundColor: isSnake ? '#4caf50' : isFood ? '#f44336' : '#fff',
            boxSizing: 'border-box',
          }}
        />
      );
    }
  }

  useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered for Snake game:', reg))
      .catch(err => console.error('SW failed:', err));
  }
 }, []);


  return (
    <>
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
         <div
      style={{ userSelect: 'none', maxWidth: 440, margin: '20px auto', textAlign: 'center' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // Prevent scrolling while swiping
      onTouchMove={e => e.preventDefault()}
    >
     
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          justifyContent: 'center',
          margin: '20px auto',
          border: '2px solid #333',
          backgroundColor: '#eee',
        }}
      >
        {cells}
      </div>

      {gameOver ? (
        <>
          <h2 style={{ color: '#b33' }}>Game Over!</h2>
          <button onClick={restartGame} style={{ fontSize: 16, padding: '10px 20px' }}>
            Restart
          </button>
        </>
      ) : (
        <>
          <p>Use arrow keys, swipe on mobile, or buttons below to move</p>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => direction !== 'DOWN' && setDirection('UP')}>⬆️ Up</button>
            <div style={{ marginTop: 5 }}>
              <button onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>⬅️ Left</button>
              <button onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} style={{ marginLeft: 20 }}>
                ➡️ Right
              </button>
            </div>
            <button onClick={() => direction !== 'UP' && setDirection('DOWN')} style={{ marginTop: 5 }}>
              ⬇️ Down
            </button>
          </div>
        </>
      )}
         </div>
    </>
   
  );
}
