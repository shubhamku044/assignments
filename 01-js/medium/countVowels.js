/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let noOfVowels = 0;
  [...str].forEach((char) => {
    if (vowels.includes(char.toLowerCase())) noOfVowels++;
  });
  return noOfVowels;
}

module.exports = countVowels;
