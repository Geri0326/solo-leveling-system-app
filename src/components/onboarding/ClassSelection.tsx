import { motion } from 'motion/react';
import { Sword, Zap, Wand2, Shield, Heart } from 'lucide-react';
import { HunterClass } from '../../store/gameStore';

interface ClassSelectionProps {
  onSelect: (hunterClass: string) => void;
}

interface ClassOption {
  name: HunterClass;
  icon: React.ReactNode;
  description: string;
  bonuses: string[];
  color: string;
}

const classes: ClassOption[] = [
  {
    name: 'Fighter',
    icon: <Sword className="w-8 h-8" />,
    description: 'Master of close combat and raw power',
    bonuses: ['+5 Strength', '+2 Vitality'],
    color: 'from-red-600 to-orange-600',
  },
  {
    name: 'Assassin',
    icon: <Zap className="w-8 h-8" />,
    description: 'Swift and deadly, strikes from the shadows',
    bonuses: ['+5 Agility', '+2 Perception'],
    color: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Mage',
    icon: <Wand2 className="w-8 h-8" />,
    description: 'Wielder of arcane knowledge and magic',
    bonuses: ['+5 Intelligence', '+2 Perception'],
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Tank',
    icon: <Shield className="w-8 h-8" />,
    description: 'Unbreakable defense, protector of allies',
    bonuses: ['+5 Vitality', '+2 Endurance'],
    color: 'from-green-600 to-emerald-600',
  },
  {
    name: 'Healer',
    icon: <Heart className="w-8 h-8" />,
    description: 'Support specialist, master of recovery',
    bonuses: ['+2 Intelligence', '+3 Vitality'],
    color: 'from-yellow-600 to-amber-600',
  },
];

export function ClassSelection({ onSelect }: ClassSelectionProps) {
  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-cyan-400 tracking-wider uppercase mb-2">
            Choose Your Path
          </h1>
          <p className="text-gray-400">
            Select your Hunter class. This will determine your starting stats and playstyle.
          </p>
        </motion.div>

        {/* Class grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {classes.map((classOption, index) => (
            <motion.button
              key={classOption.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(classOption.name)}
              className="relative group bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-left hover:border-cyan-400/50 transition-all"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${classOption.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity`} />
              
              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className={`inline-flex p-3 bg-gradient-to-br ${classOption.color} rounded-lg text-white`}>
                  {classOption.icon}
                </div>

                {/* Name */}
                <h3 className="text-white">
                  {classOption.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm">
                  {classOption.description}
                </p>

                {/* Bonuses */}
                <div className="flex flex-wrap gap-2">
                  {classOption.bonuses.map((bonus) => (
                    <span
                      key={bonus}
                      className="text-xs px-2 py-1 bg-cyan-950/30 border border-cyan-400/30 rounded text-cyan-300"
                    >
                      {bonus}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm"
        >
          Don't worry - you can develop all stats through training
        </motion.div>
      </div>
    </div>
  );
}
