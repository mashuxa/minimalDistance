import { Matrix } from "../types";

export let getDpCallCounter = 0;

export const getDp = (targetIndex: number, sourceIndex: number, dp: Matrix): number => {
  //targetIndex -1
  //sourceIndex -1

  getDpCallCounter++;
  // insert  - #2 только для первого цикла t (t=0) [остальное #rest]
  // delete  - #3 только для первого элемента s=0 на каждом цикле t [остальное #rest]
  // replace - #1 для первого цикла t и первого элемента 1 раз
  //           #2 только для первого цикла t (t=0) s>0
  //           #3 только для первого элемента s=0 t>0
  //           [остальное #rest]

  // #1
  if (targetIndex < 0 && sourceIndex < 0) return 0;

  // #2
  if (targetIndex < 0) return sourceIndex + 1;

  // #3
  if (sourceIndex < 0) return targetIndex + 1;

  // #rest
  // insert  - копирует элемент сверху c предыдущего цикла t (t-1), с таким же s
  // delete  - копирует элемент слева c предыдущего элемента s-1, с таким же t
  // replace - копирует элемент по диагонали (сверху слева) t-1/s-1
  return dp[targetIndex][sourceIndex];
};

export default getDp;
