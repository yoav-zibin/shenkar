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
-231 <= nums[i] <= 231 - 1
*/

function compareNumbers(a: number, b: number) {
    return a - b;
};

function longestConsecutive(nums: number[]): number {
    let numsArray: number[] = nums;
    let tempSequence: number = 1;
    let maxSequence: number = 0;
    
    // sorting the array
    numsArray.sort(compareNumbers);
    
    // moving forward and counting consecutive elements sequence
    for (let i: number = 0; i < numsArray.length; i++) {
        if (numsArray[i] + 1 == numsArray[i + 1]) {
            tempSequence += 1;
            if (tempSequence > maxSequence) {
                maxSequence = tempSequence;
            }
        }
        else {
            tempSequence = 1;
        }
    }
    return maxSequence;
};
