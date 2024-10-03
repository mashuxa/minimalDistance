import minimalDistance from "./src/minimalDistance/minimalDistance";
import { getDpCallCounter } from "./src/getDp/getDp";

console.time("minimalDistance");

const result = minimalDistance(process.argv[2], process.argv[3]);

console.timeEnd("minimalDistance");
console.log(`getDp called ${getDpCallCounter} times`);

console.log(result);
