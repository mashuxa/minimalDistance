import getDp from "../getDp/getDp";
import { BLUE, GREEN, PURPLE, YELLOW } from "../colors";

const minimalDistance = (source: string, target: string): number => {
  const targetLength = target.length;
  const sourceLength = source.length;
  const dp = Array(targetLength);

  for (let t = 0; t < targetLength; t++) {
    dp[t] = Array(sourceLength);

    for (let s = 0; s < sourceLength; s++) {
      dp[t][s] = Math.min(
        getDp(t - 1, s, dp) + 1, // insert
        getDp(t, s - 1, dp) + 1, // delete
        getDp(t - 1, s - 1, dp) + (target[t] === source[s] ? 0 : 1), //replace
      );
    }
  }

  let distance = getDp(targetLength - 1, sourceLength - 1, dp);
  const savedDistance = distance;
  let targetIndex = targetLength - 1;
  let sourceIndex = sourceLength - 1;
  const convertibleWordArr = [...source];

  console.log(YELLOW, "convertibleWordArr", convertibleWordArr.join(""));

  while (distance > 0) {
    const del = getDp(targetIndex, sourceIndex - 1, dp);
    const insert = getDp(targetIndex - 1, sourceIndex, dp);
    const replace = getDp(targetIndex - 1, sourceIndex - 1, dp);

    if (replace < distance) {
      convertibleWordArr[sourceIndex] = target[targetIndex];
      targetIndex = targetIndex - 1;
      sourceIndex = sourceIndex - 1;
      distance = replace;

      console.log(GREEN, "replace", convertibleWordArr.join(""));
    } else if (del < distance) {
      convertibleWordArr[sourceIndex] = "";
      sourceIndex = sourceIndex - 1;
      distance = del;

      console.log(PURPLE, "delete", convertibleWordArr.join(""));
    } else if (insert < distance) {
      convertibleWordArr.splice(sourceIndex + 1, 0, target[targetIndex]);
      targetIndex = targetIndex - 1;
      distance = insert;

      console.log(BLUE, "insert", convertibleWordArr.join(""));
    } else {
      targetIndex = targetIndex - 1;
      sourceIndex = sourceIndex - 1;
    }
  }

  return savedDistance;
};

export default minimalDistance;
