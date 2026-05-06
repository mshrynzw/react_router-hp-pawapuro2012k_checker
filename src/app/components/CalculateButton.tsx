import { motion } from 'motion/react';
import { Calculator, Sparkles } from 'lucide-react';

interface CalculateButtonProps {
  onClick: () => void;
}

export function CalculateButton({ onClick }: CalculateButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex justify-center my-12"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative group"
      >
        {/* 外側のグロー */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

        {/* ボタン本体 */}
        <div className="relative flex items-center gap-4 bg-gradient-to-r from-blue-600 to-cyan-600 px-12 py-6 rounded-2xl shadow-2xl border border-blue-400/50">
          <Sparkles className="w-6 h-6" />
          <span className="text-2xl font-bold tracking-wide">経験点を計算</span>
          <Calculator className="w-6 h-6" />
        </div>

        {/* 下部のアクセント */}
        <motion.div
          animate={{
            scaleX: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm"
        />
      </motion.button>
    </motion.div>
  );
}
