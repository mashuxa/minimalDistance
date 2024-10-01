import getDp from "./getDp";

const minimalDistance = (firstWord: string, secondWord: string): number => {
  const firstWordLength = firstWord.length;
  const secondWordLength = secondWord.length;
  const dp = Array(firstWordLength);

  for (let i = 0; i < firstWordLength; i++) {
    dp[i] = Array(secondWordLength);

    for (let j = 0; j < secondWordLength; j++) {
      dp[i][j] = Math.min(
        getDp(i - 1, j, dp) + 1,
        getDp(i, j - 1, dp) + 1,
        getDp(i - 1, j - 1, dp) + (firstWord[i] === secondWord[j] ? 0 : 1),
      );
    }
  }

  let distance = getDp(firstWordLength - 1, secondWordLength - 1, dp);
  const savedDistance = distance;
  let firstWordIndex = firstWordLength - 1;
  let secondWordIndex = secondWordLength - 1;
  const currentWord = Array.from(secondWord);

  console.log(currentWord.join(""));

  while (distance > 0) {
    const del = getDp(firstWordIndex, secondWordIndex - 1, dp);
    const insert = getDp(firstWordIndex - 1, secondWordIndex, dp);
    const replace = getDp(firstWordIndex - 1, secondWordIndex - 1, dp);

    if (replace < distance) {
      currentWord[secondWordIndex] = firstWord[firstWordIndex];
      firstWordIndex -= 1;
      secondWordIndex -= 1;
      distance = replace;

      console.log(currentWord.join(""));
    } else if (del < distance) {
      currentWord[secondWordIndex] = "";
      secondWordIndex -= 1;
      distance = del;

      console.log(currentWord.join(""));
    } else if (insert < distance) {
      currentWord.splice(secondWordIndex + 1, 0, firstWord[firstWordIndex]);
      firstWordIndex -= 1;
      distance = insert;

      console.log(currentWord.join(""));
    } else {
      firstWordIndex -= 1;
      secondWordIndex -= 1;
    }
  }

  return savedDistance;
};

export default minimalDistance;
