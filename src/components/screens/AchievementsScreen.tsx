import { motion } from 'motion/react';
import { Trophy, Lock } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export function AchievementsScreen() {
  const { achievements } = useGameStore();

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = (unlockedCount / totalCount) * 100;

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-cyan-400 tracking-wider uppercase mb-1">
            Achievements
          </h1>
          <p className="text-gray-500 text-sm">[ Hunter Milestones ]</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-400" />
              <div>
                <p className="text-white">Completion</p>
                <p className="text-gray-400 text-sm">
                  {unlockedCount} / {totalCount}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-cyan-400">{Math.round(progress)}%</p>
            </div>
          </div>
          
          <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
            />
          </div>
        </motion.div>

        {/* Achievements list */}
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-slate-900/50 border rounded-lg p-5 ${
                achievement.unlocked
                  ? 'border-amber-400/50 bg-amber-950/10'
                  : 'border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center text-3xl ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-2 border-amber-400/50'
                      : 'bg-slate-950/50 border-2 border-slate-700'
                  }`}
                >
                  {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6 text-gray-600" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`mb-1 ${
                      achievement.unlocked ? 'text-amber-400' : 'text-gray-500'
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {achievement.description}
                  </p>
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-gray-500">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                  
                  {!achievement.unlocked && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-cyan-950/20 border border-cyan-400/30 rounded-lg p-4"
        >
          <p className="text-cyan-300 uppercase tracking-wide text-xs mb-2">
            [ System Notice ]
          </p>
          <p className="text-gray-300 text-sm">
            Unlock achievements by completing quests, leveling up, and maintaining streaks. More achievements will be added as you progress.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
