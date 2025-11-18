import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AwakeningScreen } from './onboarding/AwakeningScreen';
import { ClassSelection } from './onboarding/ClassSelection';
import { CharacterCreation } from './onboarding/CharacterCreation';
import { SystemInitialization } from './onboarding/SystemInitialization';

type OnboardingStep = 'awakening' | 'class' | 'character' | 'initialization';

export function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('awakening');
  const [selectedClass, setSelectedClass] = useState<string>('');

  const handleClassSelect = (hunterClass: string) => {
    setSelectedClass(hunterClass);
    setStep('character');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'awakening' && (
          <motion.div
            key="awakening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AwakeningScreen onContinue={() => setStep('class')} />
          </motion.div>
        )}

        {step === 'class' && (
          <motion.div
            key="class"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <ClassSelection onSelect={handleClassSelect} />
          </motion.div>
        )}

        {step === 'character' && (
          <motion.div
            key="character"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <CharacterCreation
              selectedClass={selectedClass}
              onComplete={() => setStep('initialization')}
            />
          </motion.div>
        )}

        {step === 'initialization' && (
          <motion.div
            key="initialization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SystemInitialization />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
