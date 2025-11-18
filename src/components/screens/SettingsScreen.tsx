import { motion } from 'motion/react';
import { Settings, Trash2, Download, Upload, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useGameStore } from '../../store/gameStore';
import { useState } from 'react';

export function SettingsScreen() {
  const { player, resetProgress } = useGameStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (showResetConfirm) {
      resetProgress();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
    }
  };

  const exportData = () => {
    const data = localStorage.getItem('hunter-system-storage');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hunter-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            localStorage.setItem('hunter-system-storage', event.target.result);
            window.location.reload();
          } catch (error) {
            alert('Failed to import data');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
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
            Settings
          </h1>
          <p className="text-gray-500 text-sm">[ System Configuration ]</p>
        </motion.div>

        {/* Hunter Info */}
        {player && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-cyan-400" />
              <h3 className="text-cyan-400 uppercase tracking-wide text-sm">
                Hunter Profile
              </h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{player.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Class:</span>
                <span className="text-white">{player.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Level:</span>
                <span className="text-white">{player.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rank:</span>
                <span className="text-white">{player.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Registered:</span>
                <span className="text-white">
                  {new Date(player.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-700 rounded-lg p-6"
        >
          <h3 className="text-cyan-400 uppercase tracking-wide text-sm mb-4">
            Data Management
          </h3>
          
          <div className="space-y-3">
            <Button
              onClick={exportData}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Progress
            </Button>
            
            <Button
              onClick={importData}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white justify-start"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Progress
            </Button>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-700 rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-cyan-400" />
            <h3 className="text-cyan-400 uppercase tracking-wide text-sm">
              About The System
            </h3>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            A gamified life improvement system inspired by Solo Leveling. Turn your real-life activities into quests, gain XP, level up, and become the strongest version of yourself.
          </p>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Version: 1.0.0</p>
            <p>Data Storage: Local (Browser)</p>
            <p>No account required</p>
          </div>
        </motion.div>

        {/* Future Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-950/20 border border-purple-400/30 rounded-lg p-6"
        >
          <h3 className="text-purple-400 uppercase tracking-wide text-sm mb-3">
            Coming Soon
          </h3>
          
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-purple-400">▸</span>
              Cloud sync & cross-device support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">▸</span>
              Leaderboards & party system
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">▸</span>
              Boss fights & weekly challenges
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">▸</span>
              Custom quest creator
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">▸</span>
              Fitness tracking integration
            </li>
          </ul>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-950/20 border border-red-400/30 rounded-lg p-6"
        >
          <h3 className="text-red-400 uppercase tracking-wide text-sm mb-3">
            Danger Zone
          </h3>
          
          <p className="text-gray-300 text-sm mb-4">
            Reset all progress and start fresh. This action cannot be undone.
          </p>
          
          {showResetConfirm && (
            <div className="bg-red-950/30 border border-red-400/50 rounded p-3 mb-3">
              <p className="text-red-300 text-sm mb-2">
                Are you absolutely sure? All data will be permanently deleted.
              </p>
              <Button
                onClick={() => setShowResetConfirm(false)}
                variant="outline"
                className="w-full mb-2 border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          )}
          
          <Button
            onClick={handleReset}
            className={`w-full ${
              showResetConfirm
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-red-900/50 hover:bg-red-900'
            } text-white`}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {showResetConfirm ? 'Confirm Reset' : 'Reset All Progress'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
