import React, { useState } from 'react';
import { QuestionTopic } from '../data/questions';

interface Player {
  name: string;
  topics: QuestionTopic[];
  score: number;
}

interface PlayerSetupProps {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  topics: QuestionTopic[];
  playerNumber: number;
  onComplete: () => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ player, setPlayer, topics, playerNumber, onComplete }) => {
  const [name, setName] = useState(player.name);
  const [selectedTopics, setSelectedTopics] = useState<QuestionTopic[]>(player.topics);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic');
      return;
    }
    setPlayer({ ...player, name, topics: selectedTopics });
    onComplete();
  };

  const handleTopicToggle = (topic: QuestionTopic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={`player${playerNumber}Name`} className="block text-sm font-medium text-gray-700">
          Player {playerNumber} Name
        </label>
        <input
          type="text"
          id={`player${playerNumber}Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">Select comfortable topics:</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {topics.map((topic) => (
            <label key={topic} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedTopics.includes(topic)}
                onChange={() => handleTopicToggle(topic)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2">{topic}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </form>
  );
};

export default PlayerSetup;