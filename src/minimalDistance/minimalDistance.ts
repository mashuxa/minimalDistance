import getCalculatedValue from "../getCalculatedValue/getCalculatedValue";
import { deleteFn, insertFn, replaceFn } from "../operations/operations";
import printOperationResult from "../printOperationResult/printOperationResult";
import { Matrix, Operation } from "../types";

const minimalDistance = (source: string, target: string): number => {
  const targetLength = target.length;
  const sourceLength = source.length;

  if (!targetLength || !sourceLength) {
    return Math.abs(targetLength - sourceLength);
  }

  const dp: Matrix = [];
  const shouldInsert = targetLength > sourceLength;
  const shiftFn = shouldInsert ? insertFn : deleteFn;
  const shiftMatrix: Matrix = [];
  const replaceMatrix: Matrix = [];

  for (let t = 0; t < targetLength; t++) {
    dp[t] = [];
    shiftMatrix[t] = [];
    replaceMatrix[t] = [];

    for (let s = 0; s < sourceLength; s++) {
      shiftMatrix[t][s] = shiftFn(t, s, dp);
      replaceMatrix[t][s] = replaceFn(t, s, dp);
      dp[t][s] = Math.min(shiftMatrix[t][s] + 1, replaceMatrix[t][s] + (target[t] === source[s] ? 0 : 1));
    }
  }

  let distance = dp[targetLength - 1][sourceLength - 1];
  let targetIndex = targetLength - 1;
  let sourceIndex = sourceLength - 1;
  const convertibleWordArr = [...source];

  printOperationResult(Operation.convertibleWord, convertibleWordArr);

  while (distance > 0) {
    const replace = getCalculatedValue(replaceMatrix, targetIndex, sourceIndex);
    const shift = getCalculatedValue(shiftMatrix, targetIndex, sourceIndex);

    if (replace < distance) {
      convertibleWordArr[sourceIndex] = target[targetIndex];
      targetIndex--;
      sourceIndex--;
      distance = replace;

      printOperationResult(Operation.replace, convertibleWordArr);
    } else if (shift < distance) {
      if (shouldInsert) {
        convertibleWordArr.splice(sourceIndex + 1, 0, target[targetIndex]);
        targetIndex--;

        printOperationResult(Operation.insert, convertibleWordArr);
      } else {
        convertibleWordArr[sourceIndex] = "";
        sourceIndex--;

        printOperationResult(Operation.delete, convertibleWordArr);
      }

      distance = shift;
    } else {
      targetIndex--;
      sourceIndex--;
    }
  }

  return dp[targetLength - 1][sourceLength - 1];
};

export default minimalDistance;
