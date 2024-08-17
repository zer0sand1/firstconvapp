import { useState } from 'react'
import Layout from '../components/Layout'
import PlayerSetup from '../components/PlayerSetup'
import GamePlay from '../components/GamePlay'
import GameOver from '../components/GameOver'
import { QuestionTopic, allQuestions } from '../data/questions'

interface Player {
  name: string;
  topics: QuestionTopic[];
  score: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<'start' | 'setup1' | 'setup2' | 'play' | 'gameOver'>('start')
  const [player1, setPlayer1] = useState<Player>({ name: '', topics: [], score: 0 })
  const [player2, setPlayer2] = useState<Player>({ name: '', topics: [], score: 0 })

  const topics: QuestionTopic[] = Object.keys(allQuestions) as QuestionTopic[];

  const handleStart = () => setGameState('setup1')
  const handlePlayer1Complete = () => setGameState('setup2')
  const handlePlayer2Complete = () => setGameState('play')
  const handleGameOver = () => setGameState('gameOver')
  const handleRestart = () => {
    setPlayer1({ name: '', topics: [], score: 0 })
    setPlayer2({ name: '', topics: [], score: 0 })
    setGameState('start')
  }

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">First Date Conversation App</h1>
        {gameState === 'start' && (
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Game
          </button>
        )}
        {gameState === 'setup1' && (
          <PlayerSetup
            player={player1}
            setPlayer={setPlayer1}
            topics={topics}
            playerNumber={1}
            onComplete={handlePlayer1Complete}
          />
        )}
        {gameState === 'setup2' && (
          <PlayerSetup
            player={player2}
            setPlayer={setPlayer2}
            topics={topics}
            playerNumber={2}
            onComplete={handlePlayer2Complete}
          />
        )}
        {gameState === 'play' && (
          <GamePlay 
            player1={player1} 
            player2={player2} 
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            onGameOver={handleGameOver}
          />
        )}
        {gameState === 'gameOver' && (
          <GameOver 
            player1={player1}
            player2={player2}
            onRestart={handleRestart}
          />
        )}
      </div>
    </Layout>
  )
}