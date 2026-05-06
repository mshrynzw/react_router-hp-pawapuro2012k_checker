import { motion } from 'motion/react';
import { Dumbbell, Zap, Target, Brain, TrendingUp } from 'lucide-react';

interface ResultsCardProps {
  results: {
    muscle: number;
    agility: number;
    technique: number;
    mental: number;
  };
}

const statConfig = [
  {
    key: 'muscle',
    label: '筋力',
    icon: Dumbbell,
    gradient: 'from-red-500 to-orange-500',
    bgGradient: 'from-red-500/20 to-orange-500/20',
    shadowColor: 'shadow-red-500/50'
  },
  {
    key: 'agility',
    label: '敏捷',
    icon: Zap,
    gradient: 'from-yellow-500 to-amber-500',
    bgGradient: 'from-yellow-500/20 to-amber-500/20',
    shadowColor: 'shadow-yellow-500/50'
  },
  {
    key: 'technique',
    label: '技術',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    shadowColor: 'shadow-blue-500/50'
  },
  {
    key: 'mental',
    label: '精神',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
    shadowColor: 'shadow-purple-500/50'
  }
] as const;

export function ResultsCard({ results }: ResultsCardProps) {
  const maxValue = Math.max(...Object.values(results), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mt-12"
    >
      {/* 外側のグロー */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30" />

      <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-6 h-6" />
            <h2 className="text-3xl font-bold tracking-wide">必要な経験点</h2>
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* 結果グリッド */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {statConfig.map((stat, index) => {
              const value = results[stat.key as keyof typeof results];
              const percentage = (value / maxValue) * 100;
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  {/* カードグロー */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />

                  <div className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50`}>
                    {/* アイコン＆ラベル */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg ${stat.shadowColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-slate-100">{stat.label}</span>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                        className={`bg-gradient-to-r ${stat.gradient} px-4 py-2 rounded-lg shadow-lg`}
                      >
                        <span className="text-2xl font-black">{value}</span>
                      </motion.div>
                    </div>

                    {/* プログレスバー */}
                    <div className="relative h-3 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${stat.gradient} shadow-lg relative`}
                      >
                        {/* グロー効果 */}
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </motion.div>
                    </div>

                    {/* 六角形装飾 */}
                    <div className="absolute top-2 right-2 opacity-10">
                      <svg width="60" height="60" viewBox="0 0 60 60" className={`text-current`}>
                        <polygon points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 合計表示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-2xl border border-cyan-500/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-cyan-300">合計経験点</span>
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
                  className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                >
                  {results.muscle + results.agility + results.technique + results.mental}
                </motion.span>
                <span className="text-slate-400">pt</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
