import getDp from "../getDp/getDp";
import { BLUE, GREEN, PURPLE, YELLOW } from "../colors";

const minimalDistance = (source: string, target: string): number => {
  const targetLength = target.length;
  const sourceLength = source.length;
  const dp = Array(targetLength);

  for (let i = 0; i < targetLength; i++) {
    dp[i] = Array(sourceLength);

    for (let j = 0; j < sourceLength; j++) {
      dp[i][j] = Math.min(
        getDp(i - 1, j, dp) + 1,
        getDp(i, j - 1, dp) + 1,
        getDp(i - 1, j - 1, dp) + (target[i] === source[j] ? 0 : 1),
      );
    }
  }

  let distance = getDp(targetLength - 1, sourceLength - 1, dp);
  const savedDistance = distance;
  let targetIndex = targetLength - 1;
  let sourceIndex = sourceLength - 1;
  const currentWord = Array.from(source);

  console.log(YELLOW, "currentWord", currentWord.join(""));

  while (distance > 0) {
    const del = getDp(targetIndex, sourceIndex - 1, dp);
    const insert = getDp(targetIndex - 1, sourceIndex, dp);
    const replace = getDp(targetIndex - 1, sourceIndex - 1, dp);

    if (replace < distance) {
      currentWord[sourceIndex] = target[targetIndex];
      targetIndex = targetIndex - 1;
      sourceIndex = sourceIndex - 1;
      distance = replace;

      console.log(GREEN, "replace", currentWord.join(""));
    } else if (del < distance) {
      currentWord[sourceIndex] = "";
      sourceIndex = sourceIndex - 1;
      distance = del;

      console.log(PURPLE, "delete", currentWord.join(""));
    } else if (insert < distance) {
      currentWord.splice(sourceIndex + 1, 0, target[targetIndex]);
      targetIndex = targetIndex - 1;
      distance = insert;

      console.log(BLUE, "insert", currentWord.join(""));
    } else {
      targetIndex = targetIndex - 1;
      sourceIndex = sourceIndex - 1;
    }
  }

  return savedDistance;
};

export default minimalDistance;
