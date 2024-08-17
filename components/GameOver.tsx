import React from 'react';

interface Player {
  name: string;
  score: number;
}

interface GameOverProps {
  player1: Player;
  player2: Player;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ player1, player2, onRestart }) => {
  const winner = player1.score > player2.score ? player1 : player2;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
      <p className="text-xl mb-4">The winner is: {winner.name}</p>
      <div className="mb-4">
        <p>{player1.name}: {player1.score} points</p>
        <p>{player2.name}: {player2.score} points</p>
      </div>
      <button onClick={onRestart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play Again
      </button>
    </div>
  );
};

export default GameOver;