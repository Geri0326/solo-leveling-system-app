import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useGameStore } from '../../store/gameStore';
import { HunterClass } from '../../store/gameStore';

interface CharacterCreationProps {
  selectedClass: string;
  onComplete: () => void;
}

export function CharacterCreation({ selectedClass, onComplete }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const createPlayer = useGameStore((state) => state.createPlayer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createPlayer(name.trim(), selectedClass as HunterClass);
      onComplete();
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-cyan-400 tracking-wider uppercase">
            Register Hunter
          </h1>
          <p className="text-gray-400">
            Class: <span className="text-white">{selectedClass}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="hunter-name" className="text-cyan-300 text-sm uppercase tracking-wide">
                Hunter Name
              </label>
              <Input
                id="hunter-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="bg-slate-950 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-400"
                required
                autoFocus
              />
            </div>

            <div className="bg-cyan-950/20 border border-cyan-400/30 rounded p-4">
              <p className="text-cyan-300 text-sm uppercase tracking-wide mb-2">
                [ System Notice ]
              </p>
              <p className="text-gray-300 text-sm">
                Once registered, your journey begins. All actions will be tracked and rewarded by The System.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-6 shadow-lg shadow-cyan-500/50 border border-cyan-400/50"
            disabled={!name.trim()}
          >
            Complete Registration
          </Button>
        </form>

        {/* Avatar preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 rounded-full">
            <span className="text-4xl">
              {selectedClass === 'Fighter' && '⚔️'}
              {selectedClass === 'Assassin' && '🗡️'}
              {selectedClass === 'Mage' && '🔮'}
              {selectedClass === 'Tank' && '🛡️'}
              {selectedClass === 'Healer' && '💚'}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
