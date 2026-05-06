import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { CalculateButton } from './components/CalculateButton';
import { ResultsCard } from './components/ResultsCard';
import { calculateRequiredPoints } from './utils/calculateRequiredPoints';

interface Stats {
  [key: string]: number;
}

interface RequiredPoints {
  muscle: number;
  agility: number;
  technique: number;
  mental: number;
}

const STORAGE_KEY = 'pawapuro2012k_checker_state';

const DEFAULT_CURRENT_STATS: Stats = {
  ballSpeed: 150,
  control: 50,
  stamina: 50,
  senseCircle: 1,
};

const DEFAULT_TARGET_STATS: Stats = {
  ballSpeed: 170,
  control: 80,
  stamina: 80,
};

const SOUND_FILES = Object.values(
  import.meta.glob('/public/sounds/*.mp3', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
) as string[];

function isStats(value: unknown): value is Stats {
  if (typeof value !== 'object' || value === null) return false;
  return Object.values(value).every((v) => typeof v === 'number' && Number.isFinite(v));
}

function isRequiredPoints(value: unknown): value is RequiredPoints {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.muscle === 'number' &&
    typeof record.agility === 'number' &&
    typeof record.technique === 'number' &&
    typeof record.mental === 'number'
  );
}

function loadAppState(): { currentStats: Stats; targetStats: Stats; requiredPoints: RequiredPoints | null } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { currentStats: DEFAULT_CURRENT_STATS, targetStats: DEFAULT_TARGET_STATS, requiredPoints: null };
    }

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return { currentStats: DEFAULT_CURRENT_STATS, targetStats: DEFAULT_TARGET_STATS, requiredPoints: null };
    }

    const data = parsed as Record<string, unknown>;
    return {
      currentStats: isStats(data.currentStats) ? data.currentStats : DEFAULT_CURRENT_STATS,
      targetStats: isStats(data.targetStats) ? data.targetStats : DEFAULT_TARGET_STATS,
      requiredPoints: isRequiredPoints(data.requiredPoints) ? data.requiredPoints : null,
    };
  } catch {
    return { currentStats: DEFAULT_CURRENT_STATS, targetStats: DEFAULT_TARGET_STATS, requiredPoints: null };
  }
}

export default function App() {
  const [initialState] = useState(loadAppState);
  const [currentStats, setCurrentStats] = useState<Stats>(initialState.currentStats);
  const [targetStats, setTargetStats] = useState<Stats>(initialState.targetStats);
  const [requiredPoints, setRequiredPoints] = useState<RequiredPoints | null>(initialState.requiredPoints);

  useEffect(() => {
    const saveData = { currentStats, targetStats, requiredPoints };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
  }, [currentStats, targetStats, requiredPoints]);

  const playRandomSound = () => {
    if (SOUND_FILES.length === 0) return;
    const randomIndex = Math.floor(Math.random() * SOUND_FILES.length);
    const audio = new Audio(SOUND_FILES[randomIndex]);
    void audio.play().catch(() => {
      // ignore autoplay or playback errors
    });
  };

  const handleCalculate = () => {
    playRandomSound();
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
            onInputChange={playRandomSound}
            accentColor="from-blue-500 to-cyan-500"
            showSenseToggle
          />

          <StatsCard
            title="目標の能力"
            stats={targetStats}
            onChange={setTargetStats}
            onInputChange={playRandomSound}
            accentColor="from-purple-500 to-pink-500"
          />
        </div>

        <CalculateButton onClick={handleCalculate} />

        {requiredPoints && <ResultsCard results={requiredPoints} />}
      </div>
    </div>
  );
}