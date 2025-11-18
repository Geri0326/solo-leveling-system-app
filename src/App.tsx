import { useState, useEffect } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MainApp } from './components/MainApp';
import { LevelUpModal } from './components/LevelUpModal';
import { SystemMessage } from './components/SystemMessage';
import { useGameStore } from './store/gameStore';

export default function App() {
  const { player, isNewPlayer, checkLevelUp } = useGameStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState<any>(null);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check for level up on XP changes
    const result = checkLevelUp();
    if (result.leveledUp) {
      setLevelUpData(result);
      setShowLevelUp(true);
    }
  }, [player?.xp]);

  const handleLevelUpClose = () => {
    setShowLevelUp(false);
    setLevelUpData(null);
  };

  if (isNewPlayer) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <MainApp />
      
      {showLevelUp && levelUpData && (
        <LevelUpModal
          oldLevel={levelUpData.oldLevel}
          newLevel={levelUpData.newLevel}
          statPoints={levelUpData.statPoints}
          onClose={handleLevelUpClose}
        />
      )}

      {systemMessage && (
        <SystemMessage
          message={systemMessage}
          onClose={() => setSystemMessage(null)}
        />
      )}
    </div>
  );
}
