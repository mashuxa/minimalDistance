import getDp from "../getDp/getDp";
import { Matrix } from "../types";

export const insertFn = (t: number, s: number, dp: Matrix): number => getDp(t - 1, s, dp);
export const deleteFn = (t: number, s: number, dp: Matrix): number => getDp(t, s - 1, dp);
export const replaceFn = (t: number, s: number, dp: Matrix): number => getDp(t - 1, s - 1, dp);
