import getDp from "../getDp/getDp";

const minimalDistance = (source: string, target: string): number => {
  const sourceLength = source.length;
  const targetLength = target.length;
  const dp = Array(sourceLength);

  for (let i = 0; i < sourceLength; i++) {
    dp[i] = Array(targetLength);

    for (let j = 0; j < targetLength; j++) {
      dp[i][j] = Math.min(
        getDp(i - 1, j, dp) + 1,
        getDp(i, j - 1, dp) + 1,
        getDp(i - 1, j - 1, dp) + (source[i] === target[j] ? 0 : 1),
      );
    }
  }

  let distance = getDp(sourceLength - 1, targetLength - 1, dp);
  const savedDistance = distance;
  let sourceIndex = sourceLength - 1;
  let targetIndex = targetLength - 1;
  const currentWord = Array.from(target);

  console.log("\x1b[95m%s\x1b[0m", "currentWord", currentWord.join(""));

  while (distance > 0) {
    const del = getDp(sourceIndex, targetIndex - 1, dp);
    const insert = getDp(sourceIndex - 1, targetIndex, dp);
    const replace = getDp(sourceIndex - 1, targetIndex - 1, dp);

    if (replace < distance) {
      currentWord[targetIndex] = source[sourceIndex];
      sourceIndex = sourceIndex - 1;
      targetIndex = targetIndex - 1;
      distance = replace;

      console.log("\x1b[32m%s\x1b[0m", "replace", currentWord.join(""));
    } else if (del < distance) {
      currentWord[targetIndex] = "";
      targetIndex = targetIndex - 1;
      distance = del;

      console.log("\x1b[34m%s\x1b[0m", "delete", currentWord.join(""));
    } else if (insert < distance) {
      currentWord.splice(targetIndex + 1, 0, source[sourceIndex]);
      sourceIndex = sourceIndex - 1;
      distance = insert;

      console.log("\x1b[33m%s\x1b[0m", "insert", currentWord.join(""));
    } else {
      sourceIndex = sourceIndex - 1;
      targetIndex = targetIndex - 1;
    }
  }

  return savedDistance;
};

export default minimalDistance;
