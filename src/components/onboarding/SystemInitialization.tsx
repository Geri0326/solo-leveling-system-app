import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const initSteps = [
  'Initializing System...',
  'Loading Hunter Profile...',
  'Generating Daily Quests...',
  'Calibrating Stat System...',
  'Establishing Connection...',
  'System Ready.',
];

export function SystemInitialization() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < initSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Loading header */}
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full" />
          </motion.div>
          <h2 className="text-cyan-400 tracking-wider uppercase">
            System Initialization
          </h2>
        </div>

        {/* Steps */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-3">
          {initSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  index < currentStep
                    ? 'bg-cyan-500 border-cyan-500'
                    : index === currentStep
                    ? 'border-cyan-400 bg-cyan-400/20'
                    : 'border-slate-600'
                }`}
              >
                {index < currentStep && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-sm ${
                  index <= currentStep ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Completion message */}
        {currentStep >= initSteps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-950/30 border border-cyan-400/30 rounded-lg p-6 text-center"
          >
            <p className="text-cyan-300 mb-2 uppercase tracking-wide">
              [ System Active ]
            </p>
            <p className="text-gray-200">
              Welcome, Hunter. Your journey begins now.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
