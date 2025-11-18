import { motion } from 'motion/react';
import { Check, Clock, Zap, Skull, AlertTriangle } from 'lucide-react';
import { useGameStore, Quest } from '../../store/gameStore';
import { Button } from '../ui/button';

export function QuestsScreen() {
  const { quests, completeQuest } = useGameStore();

  const dailyQuests = quests.filter(q => q.type === 'daily');
  const weeklyQuests = quests.filter(q => q.type === 'weekly');
  const specialQuests = quests.filter(q => q.type === 'special');
  const urgentQuests = quests.filter(q => q.type === 'urgent');

  const completedToday = dailyQuests.filter(q => q.completed).length;
  const totalDaily = dailyQuests.length;

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
            Quest Log
          </h1>
          <p className="text-gray-500 text-sm">[ Active Missions ]</p>
        </motion.div>

        {/* Daily Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-cyan-400 uppercase tracking-wide text-sm">
              Daily Progress
            </h3>
            <span className="text-white">
              {completedToday} / {totalDaily}
            </span>
          </div>
          <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedToday / totalDaily) * 100}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </motion.div>

        {/* Urgent Quests */}
        {urgentQuests.length > 0 && (
          <QuestSection
            title="⚠️ Urgent Quests"
            description="Complete immediately or face penalties"
            quests={urgentQuests}
            onComplete={completeQuest}
            urgent
          />
        )}

        {/* Daily Quests */}
        <QuestSection
          title="📋 Daily Quests"
          description="Reset at midnight"
          quests={dailyQuests}
          onComplete={completeQuest}
        />

        {/* Weekly Quests */}
        {weeklyQuests.length > 0 && (
          <QuestSection
            title="📅 Weekly Quests"
            description="Reset every Monday"
            quests={weeklyQuests}
            onComplete={completeQuest}
          />
        )}

        {/* Special Quests */}
        {specialQuests.length > 0 && (
          <QuestSection
            title="✨ Special Quests"
            description="Limited time events"
            quests={specialQuests}
            onComplete={completeQuest}
            special
          />
        )}
      </div>
    </div>
  );
}

interface QuestSectionProps {
  title: string;
  description: string;
  quests: Quest[];
  onComplete: (id: string) => void;
  urgent?: boolean;
  special?: boolean;
}

function QuestSection({ title, description, quests, onComplete, urgent, special }: QuestSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-900/50 border rounded-lg p-6 ${
        urgent
          ? 'border-red-400/50 bg-red-950/10'
          : special
          ? 'border-purple-400/50 bg-purple-950/10'
          : 'border-slate-700'
      }`}
    >
      <div className="mb-4">
        <h3 className={`uppercase tracking-wide text-sm mb-1 ${
          urgent ? 'text-red-400' : special ? 'text-purple-400' : 'text-cyan-400'
        }`}>
          {title}
        </h3>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onComplete={onComplete}
            urgent={urgent}
            special={special}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
  urgent?: boolean;
  special?: boolean;
}

function QuestCard({ quest, onComplete, urgent, special }: QuestCardProps) {
  const getCategoryIcon = () => {
    switch (quest.category) {
      case 'fitness':
        return '💪';
      case 'habit':
        return '✓';
      case 'life':
        return '🎯';
      case 'special':
        return '⭐';
      default:
        return '📌';
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        quest.completed
          ? 'bg-green-950/20 border-green-400/30'
          : urgent
          ? 'bg-slate-950/50 border-red-400/30 hover:border-red-400/50'
          : special
          ? 'bg-slate-950/50 border-purple-400/30 hover:border-purple-400/50'
          : 'bg-slate-950/50 border-slate-700 hover:border-cyan-400/50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="text-2xl mt-1">{getCategoryIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={`mb-1 ${quest.completed ? 'text-green-400 line-through' : 'text-white'}`}>
            {quest.title}
          </h4>
          <p className="text-gray-400 text-sm mb-3">{quest.description}</p>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs">
              <span className={`flex items-center gap-1 ${
                quest.completed ? 'text-green-400' : 'text-cyan-400'
              }`}>
                <Zap className="w-3 h-3" />
                +{quest.xpReward} XP
              </span>
              
              {quest.penalty && (
                <span className="flex items-center gap-1 text-red-400">
                  <AlertTriangle className="w-3 h-3" />
                  Penalty
                </span>
              )}
            </div>

            {!quest.completed && (
              <Button
                onClick={() => onComplete(quest.id)}
                size="sm"
                className={`${
                  urgent
                    ? 'bg-red-600 hover:bg-red-500'
                    : special
                    ? 'bg-purple-600 hover:bg-purple-500'
                    : 'bg-cyan-600 hover:bg-cyan-500'
                } text-white`}
              >
                Complete
              </Button>
            )}

            {quest.completed && (
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <Check className="w-4 h-4" />
                Done
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
