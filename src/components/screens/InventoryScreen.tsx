import { motion } from 'motion/react';
import { Package } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export function InventoryScreen() {
  const { inventory } = useGameStore();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-amber-600 to-yellow-600';
      case 'epic':
        return 'from-purple-600 to-pink-600';
      case 'rare':
        return 'from-blue-600 to-cyan-600';
      case 'uncommon':
        return 'from-green-600 to-emerald-600';
      default:
        return 'from-gray-600 to-slate-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-amber-400/50';
      case 'epic':
        return 'border-purple-400/50';
      case 'rare':
        return 'border-blue-400/50';
      case 'uncommon':
        return 'border-green-400/50';
      default:
        return 'border-gray-400/50';
    }
  };

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
            Inventory
          </h1>
          <p className="text-gray-500 text-sm">[ Item Storage ]</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Items</p>
              <p className="text-white text-2xl">{inventory.length}</p>
            </div>
            <Package className="w-12 h-12 text-cyan-400/30" />
          </div>
        </motion.div>

        {/* Items */}
        {inventory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900/50 border border-slate-700 rounded-lg p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Your inventory is empty</p>
            <p className="text-gray-600 text-sm">Complete quests to earn rewards</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {inventory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-slate-900/50 border ${getRarityBorder(
                  item.rarity
                )} rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer group`}
              >
                {/* Rarity gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(
                    item.rarity
                  )} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl text-center mb-3">{item.icon}</div>

                  {/* Name */}
                  <h4 className="text-white text-sm text-center mb-1 truncate">
                    {item.name}
                  </h4>

                  {/* Rarity */}
                  <p className="text-xs text-center text-gray-400 capitalize mb-2">
                    {item.rarity}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-cyan-400 text-sm">×{item.quantity}</span>
                  </div>

                  {/* Description tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    <p className="text-gray-300 text-xs">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* System note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-cyan-950/20 border border-cyan-400/30 rounded-lg p-4"
        >
          <p className="text-cyan-300 uppercase tracking-wide text-xs mb-2">
            [ System Note ]
          </p>
          <p className="text-gray-300 text-sm">
            Items can be used to boost stats, unlock abilities, or trade with other hunters. More features coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
