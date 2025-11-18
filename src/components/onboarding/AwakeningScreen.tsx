import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface AwakeningScreenProps {
  onContinue: () => void;
}

export function AwakeningScreen({ onContinue }: AwakeningScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 60px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50"
            >
              <Sparkles className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-cyan-400 tracking-wider uppercase">
            System Initialization
          </h1>
          
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-300 leading-relaxed"
            >
              Congratulations, you have been selected.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-gray-300 leading-relaxed"
            >
              The System has awakened within you. From this moment forward, your life becomes a quest. Your actions will earn experience. Your discipline will unlock power.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="bg-cyan-950/30 border border-cyan-400/30 rounded-lg p-6 space-y-3"
            >
              <p className="text-cyan-300 uppercase tracking-wide">
                [ System Message ]
              </p>
              <p className="text-gray-200">
                "Will you accept the power of The System and begin your journey as a Hunter?"
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-12 py-6 shadow-lg shadow-cyan-500/50 border border-cyan-400/50"
          >
            Accept
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
