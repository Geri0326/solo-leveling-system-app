import { useState, useEffect } from 'react';
import { Home, Target, Package, Trophy, Settings, User } from 'lucide-react';
import { StatusWindow } from './screens/StatusWindow';
import { QuestsScreen } from './screens/QuestsScreen';
import { InventoryScreen } from './screens/InventoryScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { useGameStore } from '../store/gameStore';

type Screen = 'status' | 'quests' | 'inventory' | 'achievements' | 'settings';

export function MainApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>('status');
  const checkAndUpdateStreak = useGameStore((state) => state.checkAndUpdateStreak);

  useEffect(() => {
    // Check streak on app load
    checkAndUpdateStreak();
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'status':
        return <StatusWindow />;
      case 'quests':
        return <QuestsScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <StatusWindow />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Main content */}
      <div className="flex-1 overflow-auto pb-20">
        {renderScreen()}
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-sm">
        <div className="flex justify-around items-center h-16 px-2">
          <NavButton
            icon={<User className="w-5 h-5" />}
            label="Status"
            active={activeScreen === 'status'}
            onClick={() => setActiveScreen('status')}
          />
          <NavButton
            icon={<Target className="w-5 h-5" />}
            label="Quests"
            active={activeScreen === 'quests'}
            onClick={() => setActiveScreen('quests')}
          />
          <NavButton
            icon={<Package className="w-5 h-5" />}
            label="Inventory"
            active={activeScreen === 'inventory'}
            onClick={() => setActiveScreen('inventory')}
          />
          <NavButton
            icon={<Trophy className="w-5 h-5" />}
            label="Achievements"
            active={activeScreen === 'achievements'}
            onClick={() => setActiveScreen('achievements')}
          />
          <NavButton
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            active={activeScreen === 'settings'}
            onClick={() => setActiveScreen('settings')}
          />
        </div>
      </nav>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
        active
          ? 'text-cyan-400 bg-cyan-950/30'
          : 'text-gray-400 hover:text-gray-300'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
