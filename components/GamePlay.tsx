import React, { useState, useEffect } from 'react';
import { allQuestions, QuestionTopic } from '../data/questions';

interface Player {
  name: string;
  topics: QuestionTopic[];
  score: number;
}

interface GamePlayProps {
  player1: Player;
  player2: Player;
  setPlayer1: React.Dispatch<React.SetStateAction<Player>>;
  setPlayer2: React.Dispatch<React.SetStateAction<Player>>;
  onGameOver: () => void;
}

const GAME_LENGTH = 10;
const QUESTION_TIME = 60;

const GamePlay: React.FC<GamePlayProps> = ({ player1, player2, setPlayer1, setPlayer2, onGameOver }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(player1);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [sharedTopics, setSharedTopics] = useState<QuestionTopic[]>([]);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  useEffect(() => {
    console.log('Player 1 topics:', player1.topics);
    console.log('Player 2 topics:', player2.topics);
    const shared = player1.topics.filter(topic => player2.topics.includes(topic));
    console.log('Shared topics:', shared);
    setSharedTopics(shared);
    askQuestion();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleAnswer('pass');
          return QUESTION_TIME;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const askQuestion = () => {
    console.log('Asking new question');
    console.log('Current shared topics:', sharedTopics);
    if (sharedTopics.length === 0) {
      console.error('No shared topics');
      setCurrentQuestion('Error: No shared topics. Please restart the game and select common topics.');
      return;
    }
    const randomTopic = sharedTopics[Math.floor(Math.random() * sharedTopics.length)];
    console.log('Selected topic:', randomTopic);
    const topicQuestions = allQuestions[randomTopic];
    console.log('Questions for topic:', topicQuestions);
    if (!topicQuestions || topicQuestions.length === 0) {
      console.error('No questions for topic:', randomTopic);
      setCurrentQuestion(`Error: No questions available for the topic "${randomTopic}". Please check the questions data.`);
      return;
    }
    const randomQuestion = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
    console.log('Selected question:', randomQuestion);
    setCurrentQuestion(randomQuestion);
    setTimeLeft(QUESTION_TIME);
  };

  const handleAnswer = (quality: 'good' | 'okay' | 'pass') => {
    const points = quality === 'good' ? 3 : quality === 'okay' ? 1 : 0;
    const updatedPlayer = { ...currentPlayer, score: currentPlayer.score + points };

    if (currentPlayer === player1) {
      setPlayer1(updatedPlayer);
    } else {
      setPlayer2(updatedPlayer);
    }

    if (round >= GAME_LENGTH) {
      onGameOver();
    } else {
      setRound(round + 1);
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
      askQuestion();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Round {round}: {currentPlayer.name}'s Turn</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl mb-4">{currentQuestion || 'Loading question...'}</p>
        <div className="mb-4 text-lg">Time left: {timeLeft} seconds</div>
        <div className="flex justify-between">
          <button onClick={() => handleAnswer('good')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Good Answer</button>
          <button onClick={() => handleAnswer('okay')} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Okay Answer</button>
          <button onClick={() => handleAnswer('pass')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Pass</button>
        </div>
      </div>
      <div className="text-xl">
        Scores: {player1.name}: {player1.score}, {player2.name}: {player2.score}
      </div>
    </div>
  );
};

export default GamePlay;