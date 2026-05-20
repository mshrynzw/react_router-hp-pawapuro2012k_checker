import { useId, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface SePlayRateSelectorProps {
  sePlayRate: number;
  onSePlayRateChange: (value: number) => void;
}

const SE_PLAY_RATE_OPTIONS = Array.from({ length: 11 }, (_, index) => index * 10);

export function SePlayRateSelector({
  sePlayRate,
  onSePlayRateChange,
}: SePlayRateSelectorProps) {
  const [isZeroConfirmOpen, setIsZeroConfirmOpen] = useState(false);
  const selectId = useId();

  const handleSePlayRateChange = (value: number) => {
    if (value === 0 && sePlayRate !== 0) {
      setIsZeroConfirmOpen(true);
      return;
    }

    onSePlayRateChange(value);
  };

  const confirmZeroPercent = () => {
    onSePlayRateChange(0);
    setIsZeroConfirmOpen(false);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-xm sm:max-w-sm flex flex-row justify-center items-center gap-4">
        <label
          htmlFor={selectId}
          className="block text-center text-sm font-semibold text-slate-200"
        >
          SEの発音%
        </label>
        <select
          id={selectId}
          value={sePlayRate}
          onChange={(event) => handleSePlayRateChange(Number(event.target.value))}
          className="w-auto rounded-md border border-cyan-400/40 bg-slate-900/70 px-4 py-1 text-center text-base font-semibold text-slate-100 shadow-[0_0_25px_rgba(34,211,238,0.18)] outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40"
        >
          {SE_PLAY_RATE_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-slate-900 text-slate-100">
              {option}%
            </option>
          ))}
        </select>
      </div>

      <AlertDialog open={isZeroConfirmOpen} onOpenChange={setIsZeroConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>SEの発音%を0%に設定します</AlertDialogTitle>
            <AlertDialogDescription>
              世界の屁こき隊のイメージは、もう捨てるですね？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>捨てない</AlertDialogCancel>
            <AlertDialogAction onClick={confirmZeroPercent}>捨てる</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
