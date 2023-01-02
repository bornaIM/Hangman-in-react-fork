import isALetter from "./isALetter";

export default function createQuoteMask(quote, visibleLetters) {
  let mask = "";

  for (let char of quote) {
    if (
      isALetter(char) &&
      !visibleLetters.includes(char.toUpperCase()) &&
      !visibleLetters.includes(char.toLowerCase())
    ) {
      mask += "_";
    } else {
      mask += char;
    }
  }
  return mask;
}
