/**
implement a moving average: a stream of doubles are passed to your program and you want to maintain an average of the X last numbers received, how would you do that?
To simplify implement the following: public double[] movingAvg(int x, double[] a);
this method returns an array were every cell represents the avg of the x numbers before (including the cell itself). 
Example: movingAvg(5, [1,2,3,4,5,6]) = [1,1.5,2,2.5,3,4].
 */
export function movingAvg(x: number, a: number[]): number[] {
    let result: number[] = [];
    let currentSum = 0;
    let currentElemNum = 0;
    for (let i = 0; i < a.length; i++) {
        let currentElem = a[i];
        currentSum += currentElem;
        currentElemNum++;
        if (currentElemNum > x) {
            currentSum -= a[i - x];
            currentElemNum--;
        }
        result[i] = currentSum / currentElemNum;
    }
    return result;
}