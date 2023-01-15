import { SEARCH_SEPARATORS } from "./constants";

export function SplitSearchStr(value: string) {
  return value
    .replace(/\s+/g, " ") // clean duplicate whitespaces
    .trim() // Trim end/start
    .split(new RegExp(SEARCH_SEPARATORS.join("|"), "g")) // split to array of search terms
    .filter((e) => e !== "" && e !== " ");
}

export function merge<T>(xs: T[], x: T):T[]{
  if (xs.includes(x)) return xs
  else return [...xs, x]
}

export function remove<T>(xs: T[], x: T) :T[]{
  return xs.filter((_x) => _x !== x)
}