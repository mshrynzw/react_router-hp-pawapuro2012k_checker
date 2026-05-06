import { motion } from "motion/react";
import { Calculator, Sparkles, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface CalculateButtonProps {
  onClick: () => void;
  onClear: () => void;
}

export function CalculateButton({ onClick, onClear }: CalculateButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex flex-wrap justify-center gap-4 my-12"
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
          <span className="text-2xl font-bold tracking-wide">経験値を計算</span>
          <Calculator className="w-6 h-6" />
        </div>

        {/* 下部のアクセント */}
        <motion.div
          animate={{
            scaleX: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm"
        />
      </motion.button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition duration-500" />
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 px-8 py-6 rounded-2xl shadow-2xl border border-slate-400/40">
              <RotateCcw className="w-5 h-5" />
              <span className="text-xl font-bold tracking-wide">入力値をクリア</span>
            </div>
          </motion.button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に初期化しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              現在の能力・目標の能力・計算結果を初期状態に戻します。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={onClear}>初期化する</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
