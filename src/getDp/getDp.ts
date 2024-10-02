const getDp = (i: number, j: number, dp: number[][]): number => {
  if (i < 0 && j < 0) return 0;
  if (i < 0) return j + 1;
  if (j < 0) return i + 1;

  return dp[i][j];
};

export default getDp;
