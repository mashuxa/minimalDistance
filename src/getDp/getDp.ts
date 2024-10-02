const getDp = (targetIndex: number, sourceIndex: number, dp: number[][]): number => {
  if (targetIndex < 0 && sourceIndex < 0) return 0;
  if (targetIndex < 0) return sourceIndex + 1;
  if (sourceIndex < 0) return targetIndex + 1;

  return dp[targetIndex][sourceIndex];
};

export default getDp;
