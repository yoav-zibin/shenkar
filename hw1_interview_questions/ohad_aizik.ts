/** 
 * 128. Longest Consecutive Sequence *
 * https://leetcode.com/problems/longest-consecutive-sequence/ *
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
Follow up: Could you implement the O(n) solution? 

Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Constraints:
0 <= nums.length <= 104
0 <= nums[i] <= 231 - 1
*/

export function longestConsecutive(nums: number[]): number {
<<<<<<< HEAD
  // finding the max element in the array, if the array is empty we use 0
  const maxNumber: number = nums.length > 0 ? Math.max(...nums) : 0;
  // creating array with in the max number length initialized with undefined values for the counting sort
  const countingArray: number[] = new Array(maxNumber).fill(undefined);
  let tempSequence: number = 0;
  let maxSequence: number = 0;

  // filling the counting array
  for (let i: number = 0; i < nums.length; i++) {
    countingArray[nums[i]] = nums[i];
  }

  // travers in the counting sort array and count the longest consecutive
  for (let i: number = 0; i < countingArray.length; i++) {
    if (countingArray[i] !== undefined) {
      tempSequence += 1;
      if (tempSequence > maxSequence) {
        maxSequence = tempSequence;
      }
    } else {
      tempSequence = 0;
    }
  }

  return maxSequence;
}
=======

    let maxNumber: number = nums.length > 0 ? Math.max(...nums) : 0;    // finding the max element in the array, if the array is empty we use 0
    let countingArray: number[] = new Array(maxNumber).fill(undefined); // creating array with in the max number length initialized with undefined values for the counting sort
    let tempSequence: number = 0;
    let maxSequence: number = 0;

    // filling the counting array
    for (let i: number = 0; i < nums.length; i++) {
        countingArray[nums[i]] = nums[i];
    };

    // travers in the counting sort array and count the longest consecutive
    for (let i: number = 0; i < countingArray.length; i++) {
        if (countingArray[i] !== undefined) {
            tempSequence += 1;
            if (tempSequence > maxSequence) {
                maxSequence = tempSequence;
            }
        }
        else {
            tempSequence = 0;
        }
    };
    
    return maxSequence; 
};
>>>>>>> 730599d (algorithem fixes)
