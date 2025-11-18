import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HunterClass = 'Fighter' | 'Assassin' | 'Mage' | 'Tank' | 'Healer';
export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface Stats {
  strength: number;
  agility: number;
  vitality: number;
  endurance: number;
  intelligence: number;
  perception: number;
}

export interface Player {
  name: string;
  class: HunterClass;
  level: number;
  xp: number;
  rank: Rank;
  stats: Stats;
  statPoints: number;
  avatar: string;
  createdAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special' | 'urgent';
  category: 'fitness' | 'habit' | 'life' | 'special';
  xpReward: number;
  completed: boolean;
  completedAt?: string;
  deadline?: string;
  penalty?: {
    stat: keyof Stats;
    amount: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: 'consumable' | 'equipment' | 'material' | 'badge';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
}

interface GameState {
  player: Player | null;
  isNewPlayer: boolean;
  quests: Quest[];
  inventory: InventoryItem[];
  achievements: Achievement[];
  streak: number;
  lastActive: string;
  
  // Actions
  createPlayer: (name: string, hunterClass: HunterClass) => void;
  addXP: (amount: number) => void;
  checkLevelUp: () => { leveledUp: boolean; oldLevel: number; newLevel: number; statPoints: number };
  allocateStatPoint: (stat: keyof Stats) => void;
  completeQuest: (questId: string) => void;
  addToInventory: (item: Omit<InventoryItem, 'id'>) => void;
  unlockAchievement: (achievementId: string) => void;
  generateDailyQuests: () => void;
  checkAndUpdateStreak: () => void;
  resetProgress: () => void;
}

const XP_PER_LEVEL = 100;
const STAT_POINTS_PER_LEVEL = 3;

const getStartingStats = (hunterClass: HunterClass): Stats => {
  const base = {
    strength: 10,
    agility: 10,
    vitality: 10,
    endurance: 10,
    intelligence: 10,
    perception: 10,
  };

  switch (hunterClass) {
    case 'Fighter':
      return { ...base, strength: 15, vitality: 12 };
    case 'Assassin':
      return { ...base, agility: 15, perception: 12 };
    case 'Mage':
      return { ...base, intelligence: 15, perception: 12 };
    case 'Tank':
      return { ...base, vitality: 15, endurance: 12 };
    case 'Healer':
      return { ...base, intelligence: 12, vitality: 13 };
    default:
      return base;
  }
};

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};

const calculateRank = (level: number): Rank => {
  if (level >= 50) return 'S';
  if (level >= 40) return 'A';
  if (level >= 30) return 'B';
  if (level >= 20) return 'C';
  if (level >= 10) return 'D';
  return 'E';
};

const generateDailyQuestsList = (): Omit<Quest, 'id' | 'completed'>[] => {
  const today = new Date().toDateString();
  
  return [
    {
      title: 'Morning Workout',
      description: 'Complete 30 push-ups',
      type: 'daily',
      category: 'fitness',
      xpReward: 50,
    },
    {
      title: 'Hydration Quest',
      description: 'Drink 2L of water',
      type: 'daily',
      category: 'habit',
      xpReward: 30,
    },
    {
      title: 'Environmental Care',
      description: 'Clean your room',
      type: 'daily',
      category: 'life',
      xpReward: 40,
    },
    {
      title: 'Knowledge Pursuit',
      description: 'Read 10 pages',
      type: 'daily',
      category: 'habit',
      xpReward: 35,
    },
    {
      title: 'Self-Reflection',
      description: 'Journal for 5 minutes',
      type: 'daily',
      category: 'life',
      xpReward: 30,
    },
    {
      title: 'Cardio Training',
      description: 'Run for 20 minutes',
      type: 'daily',
      category: 'fitness',
      xpReward: 45,
    },
  ];
};

const initialAchievements: Achievement[] = [
  {
    id: 'first_quest',
    title: 'First Steps',
    description: 'Complete your first quest',
    unlocked: false,
    icon: '🎯',
  },
  {
    id: 'level_5',
    title: 'Rising Hunter',
    description: 'Reach level 5',
    unlocked: false,
    icon: '⚡',
  },
  {
    id: 'level_10',
    title: 'Experienced Hunter',
    description: 'Reach level 10',
    unlocked: false,
    icon: '🔥',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    unlocked: false,
    icon: '📅',
  },
  {
    id: 'all_daily',
    title: 'Perfect Day',
    description: 'Complete all daily quests in one day',
    unlocked: false,
    icon: '✨',
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: null,
      isNewPlayer: true,
      quests: [],
      inventory: [],
      achievements: initialAchievements,
      streak: 0,
      lastActive: new Date().toDateString(),

      createPlayer: (name: string, hunterClass: HunterClass) => {
        const player: Player = {
          name,
          class: hunterClass,
          level: 1,
          xp: 0,
          rank: 'E',
          stats: getStartingStats(hunterClass),
          statPoints: 0,
          avatar: hunterClass.toLowerCase(),
          createdAt: new Date().toISOString(),
        };
        
        set({ player, isNewPlayer: false });
        get().generateDailyQuests();
      },

      addXP: (amount: number) => {
        const { player } = get();
        if (!player) return;

        set({
          player: {
            ...player,
            xp: player.xp + amount,
          },
        });
      },

      checkLevelUp: () => {
        const { player } = get();
        if (!player) return { leveledUp: false, oldLevel: 1, newLevel: 1, statPoints: 0 };

        const oldLevel = player.level;
        const newLevel = calculateLevel(player.xp);
        
        if (newLevel > oldLevel) {
          const levelsGained = newLevel - oldLevel;
          const statPointsGained = levelsGained * STAT_POINTS_PER_LEVEL;
          const newRank = calculateRank(newLevel);
          
          set({
            player: {
              ...player,
              level: newLevel,
              rank: newRank,
              statPoints: player.statPoints + statPointsGained,
            },
          });

          // Check level achievements
          if (newLevel >= 5) {
            get().unlockAchievement('level_5');
          }
          if (newLevel >= 10) {
            get().unlockAchievement('level_10');
          }

          return { leveledUp: true, oldLevel, newLevel, statPoints: statPointsGained };
        }

        return { leveledUp: false, oldLevel, newLevel: oldLevel, statPoints: 0 };
      },

      allocateStatPoint: (stat: keyof Stats) => {
        const { player } = get();
        if (!player || player.statPoints <= 0) return;

        set({
          player: {
            ...player,
            stats: {
              ...player.stats,
              [stat]: player.stats[stat] + 1,
            },
            statPoints: player.statPoints - 1,
          },
        });
      },

      completeQuest: (questId: string) => {
        const { quests, player } = get();
        if (!player) return;

        const quest = quests.find(q => q.id === questId);
        if (!quest || quest.completed) return;

        // Mark quest as complete
        const updatedQuests = quests.map(q =>
          q.id === questId
            ? { ...q, completed: true, completedAt: new Date().toISOString() }
            : q
        );

        set({ quests: updatedQuests });

        // Award XP
        get().addXP(quest.xpReward);

        // Add reward item
        get().addToInventory({
          name: 'Quest Reward Box',
          description: 'Contains random rewards',
          type: 'consumable',
          rarity: 'common',
          quantity: 1,
          icon: '📦',
        });

        // Check achievements
        const completedQuests = get().achievements.filter(a => !a.unlocked);
        if (completedQuests.length > 0) {
          get().unlockAchievement('first_quest');
        }

        // Check if all daily quests completed
        const allDailyComplete = updatedQuests
          .filter(q => q.type === 'daily')
          .every(q => q.completed);
        if (allDailyComplete) {
          get().unlockAchievement('all_daily');
        }
      },

      addToInventory: (item: Omit<InventoryItem, 'id'>) => {
        const { inventory } = get();
        
        // Check if item already exists
        const existingItem = inventory.find(i => i.name === item.name && i.type === item.type);
        
        if (existingItem) {
          set({
            inventory: inventory.map(i =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          const newItem: InventoryItem = {
            ...item,
            id: Date.now().toString() + Math.random().toString(36),
          };
          set({ inventory: [...inventory, newItem] });
        }
      },

      unlockAchievement: (achievementId: string) => {
        const { achievements } = get();
        const achievement = achievements.find(a => a.id === achievementId);
        
        if (achievement && !achievement.unlocked) {
          set({
            achievements: achievements.map(a =>
              a.id === achievementId
                ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() }
                : a
            ),
          });
        }
      },

      generateDailyQuests: () => {
        const dailyQuestsData = generateDailyQuestsList();
        const quests: Quest[] = dailyQuestsData.map((q, index) => ({
          ...q,
          id: `daily_${Date.now()}_${index}`,
          completed: false,
        }));

        set({ quests });
      },

      checkAndUpdateStreak: () => {
        const { lastActive, streak, quests } = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastActive === today) {
          return; // Already active today
        }

        // Check if any quest was completed yesterday
        const hadActivityYesterday = quests.some(
          q => q.completedAt && new Date(q.completedAt).toDateString() === yesterday
        );

        if (lastActive === yesterday || hadActivityYesterday) {
          // Continue streak
          const newStreak = streak + 1;
          set({ streak: newStreak, lastActive: today });
          
          if (newStreak >= 7) {
            get().unlockAchievement('streak_7');
          }
          
          // Generate new daily quests
          get().generateDailyQuests();
        } else {
          // Streak broken
          set({ streak: 1, lastActive: today });
          get().generateDailyQuests();
        }
      },

      resetProgress: () => {
        set({
          player: null,
          isNewPlayer: true,
          quests: [],
          inventory: [],
          achievements: initialAchievements,
          streak: 0,
          lastActive: new Date().toDateString(),
        });
      },
    }),
    {
      name: 'hunter-system-storage',
    }
  )
);
