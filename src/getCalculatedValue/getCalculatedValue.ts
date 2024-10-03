import { Matrix } from "../types";

export default (matrix: Matrix, targetIndex: number, sourceIndex: number): number => {
  if (matrix[targetIndex] === undefined) {
    // on delete targetIndex can be < 0
    return sourceIndex;
  }

  // on insert sourceIndex can be < 0
  return matrix[targetIndex][sourceIndex] ?? targetIndex;
};
