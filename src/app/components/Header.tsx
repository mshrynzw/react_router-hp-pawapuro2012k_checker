import { motion } from 'motion/react';
import { Trophy, Zap } from 'lucide-react';

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full blur-xl opacity-50"
          />
          <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-2xl">
            <Trophy className="w-8 h-8" />
          </div>
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
      >
        <span className="block text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
          サクセス 経験点カウンター
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-cyan-200/80 text-base md:text-lg flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" />
        実況パワフルプロ野球2012決定版
        <Zap className="w-4 h-4" />
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="h-1 w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"
      />
    </motion.div>
  );
}
