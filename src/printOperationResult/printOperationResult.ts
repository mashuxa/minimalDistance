import { BLUE, GREEN, PURPLE, YELLOW } from "../colors";
import { Operation } from "../types";

const ColorsMap = {
  [Operation.insert]: BLUE,
  [Operation.delete]: PURPLE,
  [Operation.replace]: GREEN,
  [Operation.convertibleWord]: YELLOW,
};

export default (operation: Operation, word: string[]): void => {
  console.log(ColorsMap[operation], operation, word.join(""));
};
