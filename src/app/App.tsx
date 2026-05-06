import { useState } from 'react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { CalculateButton } from './components/CalculateButton';
import { ResultsCard } from './components/ResultsCard';
import { calculateRequiredPoints } from './utils/calculateRequiredPoints';

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
    const calculated = calculateRequiredPoints(currentStats, targetStats);
    setRequiredPoints(calculated);
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