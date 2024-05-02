import React, { useState } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [pointsPerClick, setPointsPerClick] = useState(1);

  const handleButtonClick = () => {
    setPoints(points + pointsPerClick);
  };

  const handleUpgradeClick = () => {
    if (points >= 10) {
      setPoints(points - 10);
      setPointsPerClick(pointsPerClick + 1);
    }
  };

  return (
    <div className="App">
      <h1>Incremental Clicker Game</h1>
      <p>Points: {points}</p>
      <button onClick={handleButtonClick}>Click me!</button>
      <button onClick={handleUpgradeClick} disabled={points < 10}>
        Upgrade 1 (Cost: 10 points)
      </button>
    </div>
  );
}

export default App;
