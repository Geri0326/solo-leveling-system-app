import { motion } from 'motion/react';
import { ChevronUp, Flame } from 'lucide-react';
import { useGameStore, Stats } from '../../store/gameStore';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export function StatusWindow() {
  const { player, allocateStatPoint, streak } = useGameStore();

  if (!player) return null;

  const xpForNextLevel = 100;
  const currentLevelXP = player.xp % 100;
  const xpProgress = (currentLevelXP / xpForNextLevel) * 100;

  const statNames: { key: keyof Stats; label: string; icon: string }[] = [
    { key: 'strength', label: 'Strength', icon: '💪' },
    { key: 'agility', label: 'Agility', icon: '⚡' },
    { key: 'vitality', label: 'Vitality', icon: '❤️' },
    { key: 'endurance', label: 'Endurance', icon: '🛡️' },
    { key: 'intelligence', label: 'Intelligence', icon: '🧠' },
    { key: 'perception', label: 'Perception', icon: '👁️' },
  ];

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-cyan-400 tracking-wider uppercase mb-1">
            Status Window
          </h1>
          <p className="text-gray-500 text-sm">[ Hunter Profile ]</p>
        </motion.div>

        {/* Hunter Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-full flex items-center justify-center text-3xl">
              {player.class === 'Fighter' && '⚔️'}
              {player.class === 'Assassin' && '🗡️'}
              {player.class === 'Mage' && '🔮'}
              {player.class === 'Tank' && '🛡️'}
              {player.class === 'Healer' && '💚'}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-white mb-1">{player.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="px-2 py-0.5 bg-cyan-950/30 border border-cyan-400/30 rounded text-cyan-300">
                  {player.class}
                </span>
                <span className="px-2 py-0.5 bg-purple-950/30 border border-purple-400/30 rounded text-purple-300">
                  Rank {player.rank}
                </span>
              </div>
            </div>

            {/* Level */}
            <div className="text-right">
              <div className="text-3xl text-cyan-400">{player.level}</div>
              <div className="text-xs text-gray-500 uppercase">Level</div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Experience</span>
              <span className="text-cyan-400">
                {currentLevelXP} / {xpForNextLevel} XP
              </span>
            </div>
            <div className="relative h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </div>

          {/* Streak */}
          {streak > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2 bg-orange-950/30 border border-orange-400/30 rounded-lg p-3">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300">
                {streak} Day Streak
              </span>
            </div>
          )}
        </motion.div>

        {/* Stat Points Available */}
        {player.statPoints > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cyan-950/30 border-2 border-cyan-400/50 rounded-lg p-4"
          >
            <p className="text-cyan-300 text-center uppercase tracking-wide">
              {player.statPoints} Stat Point{player.statPoints > 1 ? 's' : ''} Available
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-cyan-400 uppercase tracking-wide mb-4 text-sm">
            [ Attributes ]
          </h3>
          
          <div className="space-y-3">
            {statNames.map((stat) => (
              <div
                key={stat.key}
                className="flex items-center justify-between gap-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{stat.icon}</span>
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-white min-w-[3ch] text-right">
                    {player.stats[stat.key]}
                  </span>
                  
                  {player.statPoints > 0 && (
                    <Button
                      onClick={() => allocateStatPoint(stat.key)}
                      size="sm"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white w-8 h-8 p-0"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-700 rounded-lg p-6"
        >
          <p className="text-cyan-300 uppercase tracking-wide text-sm mb-3">
            [ Daily Message ]
          </p>
          <p className="text-gray-300 italic">
            "The difference between the impossible and the possible lies in a person's determination."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
