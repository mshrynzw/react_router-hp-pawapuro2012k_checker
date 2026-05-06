import { useState } from 'react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { CalculateButton } from './components/CalculateButton';
import { ResultsCard } from './components/ResultsCard';
import { pitchTypes, baseStats } from './data/pitchData';

interface Stats {
  [key: string]: number;
}

export default function App() {
  const [currentStats, setCurrentStats] = useState<Stats>({});
  const [targetStats, setTargetStats] = useState<Stats>({});
  const [requiredPoints, setRequiredPoints] = useState<{
    muscle: number;
    agility: number;
    technique: number;
    mental: number;
  } | null>(null);

  const handleCalculate = () => {
    // 経験点計算ロジック（簡易版）
    let muscle = 0;
    let agility = 0;
    let technique = 0;
    let mental = 0;

    // 球速：筋力メイン
    const speedDiff = (targetStats.ballSpeed || 0) - (currentStats.ballSpeed || 0);
    muscle += speedDiff * 12;

    // コントロール：技術メイン
    const controlDiff = (targetStats.control || 0) - (currentStats.control || 0);
    technique += controlDiff * 8;

    // スタミナ：精神メイン
    const staminaDiff = (targetStats.stamina || 0) - (currentStats.stamina || 0);
    mental += staminaDiff * 10;

    // 変化球：各種経験点
    pitchTypes.forEach(pitch => {
      const diff = (targetStats[pitch.id] || 0) - (currentStats[pitch.id] || 0);
      if (diff > 0) {
        muscle += diff * (pitch.muscle || 0);
        agility += diff * (pitch.agility || 0);
        technique += diff * (pitch.technique || 0);
        mental += diff * (pitch.mental || 0);
      }
    });

    setRequiredPoints({
      muscle: Math.max(0, muscle),
      agility: Math.max(0, agility),
      technique: Math.max(0, technique),
      mental: Math.max(0, mental)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwxMzAsMjQ2LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <StatsCard
            title="現在の能力"
            stats={currentStats}
            onChange={setCurrentStats}
            accentColor="from-blue-500 to-cyan-500"
          />

          <StatsCard
            title="目標の能力"
            stats={targetStats}
            onChange={setTargetStats}
            accentColor="from-purple-500 to-pink-500"
          />
        </div>

        <CalculateButton onClick={handleCalculate} />

        {requiredPoints && <ResultsCard results={requiredPoints} />}
      </div>
    </div>
  );
}