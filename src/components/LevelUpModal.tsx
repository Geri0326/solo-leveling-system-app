import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
  oldLevel: number;
  newLevel: number;
  statPoints: number;
  onClose: () => void;
}

export function LevelUpModal({ oldLevel, newLevel, statPoints, onClose }: LevelUpModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-md w-full pointer-events-auto"
            >
              {/* Particle effects */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 300,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                />
              ))}

              {/* Content */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-400 rounded-lg p-8 shadow-2xl shadow-cyan-500/50">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(34, 211, 238, 0.5)',
                          '0 0 40px rgba(34, 211, 238, 0.8)',
                          '0 0 20px rgba(34, 211, 238, 0.5)',
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-gradient-to-br from-cyan-500 to-blue-500 p-6 rounded-full"
                    >
                      <TrendingUp className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-cyan-400 tracking-wider uppercase mb-2">
                    Level Up!
                  </h2>
                  <div className="flex items-center justify-center gap-3 text-white">
                    <span className="text-4xl">{oldLevel}</span>
                    <span className="text-cyan-400">→</span>
                    <span className="text-5xl">{newLevel}</span>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-cyan-950/30 border border-cyan-400/30 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center justify-center gap-2 text-cyan-300">
                    <Sparkles className="w-5 h-5" />
                    <p className="uppercase tracking-wide">
                      +{statPoints} Stat Points Earned
                    </p>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-6"
                >
                  <p className="text-gray-300 text-sm">
                    You have grown stronger. Allocate your stat points in the Status Window to increase your power.
                  </p>
                </motion.div>

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-6"
                  >
                    Continue
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
