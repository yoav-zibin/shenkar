/**
     We can rotate digits by 180 degrees to form new digits. 
     When 0, 1, 6, 8, 9 are rotated 180 degrees, they become 0, 1, 9, 8, 6 respectively. 
     When 2, 3, 4, 5, and 7 are rotated 180 degrees, they become invalid. 
     A confusing number is a number that when rotated 180 degrees becomes a different number with each digit valid.
     (Note that the rotated number can be greater than the original number.) 
     Given a positive integer N, return the number of confusing numbers between 1 and N inclusive.
 */

export default (N: number): number => {
  let amountOfConfusingNumbers = 0;

  const invalidDigits = ['2', '3', '4', '5', '7'];
  const confusingDigits = ['6', '9'];

  for (let i = 1; i <= N; ++i) {
    const containsInvalid = invalidDigits.some((digit) => i.toString().split('').includes(digit));
    const containsConfusing = confusingDigits.some((digit) => i.toString().split('').includes(digit));
    if (!containsInvalid && containsConfusing) {
      amountOfConfusingNumbers++;
    }
  }

  return amountOfConfusingNumbers;
};
