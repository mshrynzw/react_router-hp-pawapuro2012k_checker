import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Activity } from "lucide-react";
import { pitchTypes, baseStats, categories } from "../data/pitchData";

interface StatsCardProps {
  title: string;
  stats: { [key: string]: number };
  onChange: (stats: { [key: string]: number }) => void;
  onInputChange?: () => void;
  accentColor: string;
  showSenseToggle?: boolean;
}

export function StatsCard({
  title,
  stats,
  onChange,
  onInputChange,
  accentColor,
  showSenseToggle = false,
}: StatsCardProps) {
  const updateStat = (key: string, value: number) => {
    onChange({ ...stats, [key]: value });
    onInputChange?.();
  };

  const updateSenseCircle = (enabled: boolean) => {
    onChange({ ...stats, senseCircle: enabled ? 1 : 0 });
    onInputChange?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* グロー効果 */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${accentColor} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500`}
      />

      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
        {/* ヘッダー */}
        <div className={`bg-gradient-to-r ${accentColor} p-6`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-wide">{title}</h2>
          </div>
        </div>

        <div className="p-6">
          {/* 基本能力 */}
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-cyan-400 font-bold flex items-center gap-2">
                <span className="text-xl">⚾</span>
                基本能力
              </h3>
              {showSenseToggle && (
                <label className="flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-slate-800/70 px-3 py-1.5 text-sm text-cyan-200">
                  <span className="font-semibold">センス〇</span>
                  <input
                    type="checkbox"
                    checked={(stats.senseCircle ?? 1) === 1}
                    onChange={(e) => updateSenseCircle(e.target.checked)}
                    className="h-4 w-4 accent-cyan-500"
                  />
                </label>
              )}
            </div>
            <div className="grid gap-3">
              {baseStats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-cyan-500/50 transition-colors"
                >
                  <label className="text-slate-200 font-medium w-32">{stat.name}</label>
                  <input
                    type="number"
                    min="0"
                    max={stat.max}
                    value={stats[stat.id] || 0}
                    onChange={(e) => updateStat(stat.id, parseInt(e.target.value) || 0)}
                    className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 変化球 - アコーディオン */}
          <Accordion.Root type="multiple" className="space-y-2">
            {categories
              .filter((cat) => cat.id !== "base")
              .map((category) => {
                const pitchesInCategory = pitchTypes.filter((p) => p.category === category.name);

                return (
                  <Accordion.Item
                    key={category.id}
                    value={category.id}
                    className="border border-slate-700/30 rounded-xl overflow-hidden bg-slate-800/30"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors group/trigger">
                        <span className="flex items-center gap-2 text-slate-200 font-medium">
                          <span className="text-lg">{category.icon}</span>
                          {category.name}
                          <span className="text-xs text-slate-400">
                            ({pitchesInCategory.length})
                          </span>
                        </span>
                        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-300 group-data-[state=open]/trigger:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                      <div className="px-4 pb-4 space-y-2">
                        {pitchesInCategory.map((pitch) => (
                          <div
                            key={pitch.id}
                            className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700/20 hover:border-cyan-500/30 transition-colors"
                          >
                            <label className="text-slate-300 text-sm flex-1">{pitch.name}</label>
                            <input
                              type="number"
                              min="0"
                              max="7"
                              value={stats[pitch.id] || 0}
                              onChange={(e) => updateStat(pitch.id, parseInt(e.target.value) || 0)}
                              className="w-20 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
          </Accordion.Root>
        </div>
      </div>
    </motion.div>
  );
}
