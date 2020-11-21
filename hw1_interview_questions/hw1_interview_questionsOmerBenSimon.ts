/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    if(matrix.length === 0) {
        return 0;
    }
    
    const maxHistArea = (height) => {
        let max = 0;
        const stack = [-1];
        for(let i = 0; i < height.length; i++) {
            while(stack[stack.length-1] !== -1 && height[stack[stack.length-1]] >= height[i]) {
                const top = stack.pop();
                max = Math.max(max, height[top] * (i-stack[stack.length-1]-1));
            }
            stack.push(i);
        }
        while(stack[stack.length-1] !== -1) {
            const top = stack.pop();
            max = Math.max(max, height[top] * (height.length - stack[stack.length-1] - 1));
        }
        return max;
    };
    
    let height = Array(matrix[0].length).fill(0);
    let max = 0;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(matrix[i][j] === '1') {
                height[j]++;
            } else {
                height[j] = 0;
            }
        }
        max = Math.max(maxHistArea(height), max);
    }
    return max;
};