/*******************************************************************
While you are working on the following problems, it DEFINITELY HELPS to
visualize these things in action, so use the below arrays as example inputs.

const oddNums = [11, 12, 13, 14, 15, 16, 17, 18, 19]
const evenNums = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const empty = [];
*******************************************************************/


/*******************************************************************
BINARY SEARCH VERSION 1:

Write a Recursive Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/

const recurBSearch = (nums, targetNum) => {
  // Base Case: if nums has no length, return false because we've run out of 
  // items to search and haven't found targetNum
  if(!nums.length) return false;
  // determine the slice point (ie the 'middle' of the array).
    const midIndex = Math.floor(nums.length / 2);
    const midEl = nums[midIndex];

  // create "left half" and "right half" arrays, not including the slice point.
  // midIdx + 1 all the way to the end of our array (no second argument needed).
  const leftHalf = nums.slice(0, midIndex);
  const rightHalf = nums.slice(midIndex + 1);
// if targetNum is greater than the value in the array at slice point,
//return this search on the right half
  if(targetNum > midEl){
    return recurBSearch(rightHalf, targetNum);
  }
// if targetNum is less than the value in the array at slice point,
// return this search on the left half
  else if(targetNum < midEl) {
    return recurBSearch(leftHalf, targetNum);
  } 
// if it's not greater than or less than (i.e. 'else'),
// we know it's equal so return true
  else {
    return true;
  }
}

/*******************************************************************
BINARY SEARCH VERSION 2:

Write an Iterative Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/

const iterBSearch = (nums, targetNum) => {
  // Save references to indices at the beginning, middle, and end of the array
  // into variables: lowerIdx, midIdx, and upperIdx
  if (!nums.length) return false;
  let lowerIdx = 0;
  let upperIdx = nums.length - 1;
  let midIdx;
  
  // while the lowerIdx is less than or equal to the upperIdx, there are still
  // values to be searched
  while(lowerIdx <= upperIdx){
    // reassign the midIdx to the the middle of the new lower and upper indices
    // Hint: This is the sum of lower and upper, divided by 2
    midIdx = Math.floor((upperIdx + lowerIdx) / 2);
    // if targetNum is larger than the value in the middle, we know targetNum is
    // not between the current lower and current middle, so reassign the lowerIdx
    // to the middle (ie cut off the left half of the array)
    if(targetNum > nums[midIdx]){
      lowerIdx = midIdx + 1;
    }
    // if targetNum is less than the value in the middle, we know targetNum is not
    // between the current upper and current middle, so reassign the upperIdx
    // to the middle (ie cut off the right half of the array)
    else if(targetNum < nums[midIdx]){
      upperIdx = midIdx - 1;
    }
    // if it's not greater than or less than (ie 'else'), we have found our target 
    // at the midIdx and can return true and stop iterating.
    else {
      return true;
    }
  }
  // if we finish our while loop and haven't returned true, we've looked over
  // the entire array and didn't find targetNum, so return false
  return false;
}


/*******************************************************************
BINARY SEARCH VERSION 3:

Write a Recursive Binary Search that returns the Index value of targetNum if it
is in the nums array, and -1 if it is not found.
*******************************************************************/

const recurBSearchIdx = (nums, targetNums) => {
  // this implementation is identical to version 1, except rather than
  // returning true/false, return the index where you found the item
  // (instead of true) or -1 (instead of false).
  if (!nums.length) return -1;

  const midIdx = Math.floor(nums.length / 2);
  const midEl = nums[midIdx];

  const leftHalf = nums.slice(0, midIdx);
  const rightHalf = nums.slice(midIdx + 1);

  if (targetNums < midEl) {
    return recurBSearchIdx(leftHalf, targetNums);
  } else if (targetNums > midEl) {
    const idxShift = recurBSearchIdx(rightHalf, targetNums)
    if (idxShift === -1) {
      return -1
    }
    else {
      return idxShift + midIdx + 1
    }
  } else {
    return midIdx;
  }

  // HINT: the index value you return should be the index in the ORIGINAL array
  // and not the index of the sliced array. You'll notice this problem arise 
  // on the 'right half' recursion. in that, try saving the return value of the 
  // recursive call into a variable, and adding it to the current stack-frame's 
  // midIdx + 1.
}


/*******************************************************************
BINARY SEARCH VERSION 4:

Write a Recursive Binary Search that returns the Index value of targetNum if it
is in the nums array, and -1 if it is not found.
*******************************************************************/

const recurBSearchIdxV2 = (nums, targetNum, low = 0, hi = nums.length - 1) => {
  /*
  This implementation is recursive, but borrows the low/hi logic from Version 2
  to establish a different base case. Rather than shrinking the array until its
  length is 0, this implementation moves low and hi indices to determine
  what part of the original array is being searched. if they meet each other
  we know we have searched the entire array.(NOTE this function has FOUR params)
  */

 //  Base Case: 
 //  if low is equal to high and we haven't found targetNum, then return -1 to
 //  indicate that the value was not found.
  if (low === hi && nums[low] !== targetNum) {
    return -1;
  }
  let slicepoint = Math.floor((low + hi) / 2); // Determine the slice point (the sum of low and hi, divided by 2)

 //  If targetNum is less than nums[slicepoint], then
 //  return the binary search of nums where low is the beginning of the array, and
 //  hi is the middle of the array
  if (targetNum < nums[slicepoint]) {
    return recurBSearchIdxV2(nums, targetNum, low, slicepoint);
  }
  // If targetNum is less than nums[slicepoint], then
  // return the binary search of nums where low is the middle of the array, and hi
  // is the end of the array 
  else if (targetNum > nums[slicepoint]){
    return recurBSearchIdxV2(nums, targetNum, slicepoint + 1, hi);
    // If it's not greater and not less (i.e. 'else'), return the slice point because
    // we have found our value!
  }else {
    return slicepoint;
  }
  
}


/*******************************************************************
BINARY SEARCH VERSION 5:

Write an Iterative Binary Search that returns the Index value of targetNum if
it is in the nums array, and -1 if it is not found.
*******************************************************************/

const iterBSearchIdx = (nums, targetNum) => {
  // this is identical to Version 2, but return the index or -1 rather than
  // true or false
  let lowerIdx = 0;
  let upperIdx = nums.length - 1;
  let midIdx;

  while (lowerIdx <= upperIdx) {
    midIdx = Math.floor((lowerIdx + upperIdx) / 2);
    if (nums[midIdx] < targetNum) {
      lowerIdx = midIdx + 1;
    } else if (nums[midIdx] > targetNum) {
      upperIdx = midIdx - 1;
    } else {
      return midIdx;
    }
  }

  return -1;

}

module.exports = {
  recurBSearch,
  iterBSearch,
  recurBSearchIdx,
  recurBSearchIdxV2,
  iterBSearchIdx
};
