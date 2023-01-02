export default function uniqueCharNum(text) {
  let unique = "";
  let unique_num = 0;
  for (let char of text) {
    if (!unique.includes(char)) {
      unique += char;
      unique_num += 1;
    }
  }
  return unique_num;
}
