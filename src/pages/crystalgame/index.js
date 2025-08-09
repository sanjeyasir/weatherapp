import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";

export default function InteractiveMazeCollector() {
  const [level, setLevel] = useState(1);
  const [playerPos, setPlayerPos] = useState([0, 0.5, 0]);
  const [crystals, setCrystals] = useState([]);
  const [walls, setWalls] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState(null);
  const [danger, setDanger] = useState(false);

  const TURF_LIMIT = 10;

  const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const generateMaze = (lvl) => {
    const seed = lvl * 123456;
    const newWalls = [];
    const newCrystals = [];

    for (let i = -8; i <= 8; i += 2) {
      for (let j = -8; j <= 8; j += 2) {
        const randVal = seededRandom(seed + i * 100 + j);
        if (randVal < 0.3 && !(i === 0 && j === 0)) {
          if (seededRandom(seed + i * 200 + j * 50) < 0.3 + lvl * 0.05) {
            newWalls.push([i, 0.5, j]);
          }
        } else if (randVal > 0.85) {
          newCrystals.push({ position: [i, 0.3, j] });
        }
      }
    }
    return { newWalls, newCrystals };
  };

  // Initialize maze and crystals when level changes or on restart
  useEffect(() => {
    const { newWalls, newCrystals } = generateMaze(level);
    setWalls(newWalls);
    setCrystals(newCrystals.length ? newCrystals : [{ position: [0, 0.3, 0] }]);
    setPlayerPos([0, 0.5, 0]);
    setTimeLeft(60 - level * 5 > 15 ? 60 - level * 5 : 15);
    setMessage(null);
    setDanger(false);
    setScore(0);
  }, [level]);

  const collidesWall = (pos) => {
    return walls.some(
      (w) =>
        Math.abs(pos[0] - w[0]) < 1 &&
        Math.abs(pos[2] - w[2]) < 1
    );
  };

  const outOfBounds = (pos) => {
    return (
      pos[0] < -TURF_LIMIT ||
      pos[0] > TURF_LIMIT ||
      pos[2] < -TURF_LIMIT ||
      pos[2] > TURF_LIMIT
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const speed = 0.5;
      setPlayerPos((prev) => {
        let [x, y, z] = prev;
        let newPos = [...prev];
        if (e.key === "w" || e.key === "ArrowUp") newPos = [x, y, z - speed];
        else if (e.key === "s" || e.key === "ArrowDown") newPos = [x, y, z + speed];
        else if (e.key === "a" || e.key === "ArrowLeft") newPos = [x - speed, y, z];
        else if (e.key === "d" || e.key === "ArrowRight") newPos = [x + speed, y, z];
        else return prev;

        if (outOfBounds(newPos)) {
          setMessage("⚠️ Danger: Out of bounds! Stay inside the turf.");
          setDanger(true);
          setTimeout(() => setDanger(false), 1200);
          return prev;
        }

        if (collidesWall(newPos)) {
          setMessage("🚧 Oops! You hit a wall.");
          setDanger(true);
          setTimeout(() => setDanger(false), 1200);
          return prev;
        }

        if (message) setMessage(null);
        setDanger(false);
        return newPos;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [walls, message]);

  useEffect(() => {
    setCrystals((prev) => {
      const newCrystals = prev.filter((c) => {
        const dx = playerPos[0] - c.position[0];
        const dz = playerPos[2] - c.position[2];
        if (Math.sqrt(dx * dx + dz * dz) < 0.8) {
          setScore((s) => s + 10);
          return false;
        }
        return true;
      });
      if (newCrystals.length === 0) {
        setMessage("🎉 Level Complete! Loading next level...");
        setTimeout(() => {
          setLevel((l) => l + 1);
          setMessage(null);
        }, 2000);
      }
      return newCrystals;
    });
  }, [playerPos]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setMessage("⏰ Time's up! Restarting level...");
      setTimeout(() => {
        // Just restart current level immediately
        setMessage(null);
        setScore(0);
        setTimeLeft(60 - level * 5 > 15 ? 60 - level * 5 : 15);
        const { newWalls, newCrystals } = generateMaze(level);
        setWalls(newWalls);
        setCrystals(newCrystals.length ? newCrystals : [{ position: [0, 0.3, 0] }]);
        setPlayerPos([0, 0.5, 0]);
      }, 2000);
      return;
    }
    const timerId = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  // Restart game function called by button
  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setMessage(null);
    setDanger(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas camera={{ position: [15, 15, 15], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.9} />

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[TURF_LIMIT * 2, TURF_LIMIT * 2]} />
          <meshStandardMaterial color="#224422" />
        </mesh>

        <mesh position={playerPos}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={danger ? "#ff5555" : "#3399ff"} />
        </mesh>

        {walls.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#886633" />
          </mesh>
        ))}

        {crystals.map((c, i) => (
          <mesh key={i} position={c.position}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial emissive="#00ffff" color="#aaffff" />
          </mesh>
        ))}
      </Canvas>

      {/* HUD */}
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          color: "white",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          fontSize: 16,
          textShadow: "0 0 6px black",
          zIndex: 30,
          userSelect: "none",
          maxWidth: 320,
          lineHeight: "1.4em",
        }}
      >
        <div><strong>Level:</strong> {level}</div>
        <div><strong>Score:</strong> {score}</div>
        <div>
          <strong>Time:</strong>{" "}
          <span style={{ color: timeLeft <= 10 ? "#ff6961" : "white" }}>
            {timeLeft}s
          </span>
        </div>
        {message && (
          <div
            style={{
              marginTop: 8,
              padding: "8px 12px",
              borderRadius: 8,
              backgroundColor: danger ? "rgba(255, 50, 50, 0.85)" : "rgba(50, 255, 50, 0.85)",
              color: danger ? "#ffeeee" : "#002200",
              fontWeight: "bold",
              userSelect: "none",
              transition: "background-color 0.3s ease",
            }}
          >
            {message}
          </div>
        )}
        <div style={{ marginTop: 12, fontSize: 14, color: "#ccc" }}>
          Use <kbd>WASD</kbd> or <kbd>Arrow Keys</kbd> to move.
        </div>
        <button
          onClick={restartGame}
          style={{
            marginTop: 16,
            padding: "8px 16px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            backgroundColor: "#3399ff",
            color: "white",
            cursor: "pointer",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseDown={e => e.currentTarget.style.backgroundColor = "#2277dd"}
          onMouseUp={e => e.currentTarget.style.backgroundColor = "#3399ff"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#3399ff"}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}




