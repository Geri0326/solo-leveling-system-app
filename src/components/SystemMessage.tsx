import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface SystemMessageProps {
  message: string;
  onClose: () => void;
}

export function SystemMessage({ message, onClose }: SystemMessageProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/50 p-4 max-w-md w-full">
            <p className="text-white text-center text-sm uppercase tracking-wide">
              [ System Message ]
            </p>
            <p className="text-white text-center mt-1">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
