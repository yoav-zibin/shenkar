/**
"Given a matrix of N rows and M columns. 
From m[i][j], we can move to m[i+1][j], if m[i+1][j] > m[i][j], or can move to m[i][j+1] if m[i][j+1] > m[i][j].
The task is print longest path length if we start from (0, 0)."
 */

export function matrixLongestIncreasinPath(matrix: number[][], numRows: number, numCols: number): number {
  let result: number = 0;
  let matrixPaths: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    matrixPaths[i] = [];
    for (let j = 0; j < numCols; j++) {
      matrixPaths[i].push(0);
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (i + 1 < numRows && matrix[i + 1][j] > matrix[i][j])
        if (matrixPaths[i + 1][j] < matrixPaths[i][j] + 1) matrixPaths[i + 1][j] = matrixPaths[i][j] + 1;

      if (j + 1 < numCols && matrix[i][j + 1] > matrix[i][j])
        if (matrixPaths[i][j + 1] < matrixPaths[i][j] + 1) matrixPaths[i][j + 1] = matrixPaths[i][j] + 1;
    }
  }

  for (let i = 0; i < numRows; i++)
    for (let j = 0; j < numCols; j++) if (matrixPaths[i][j] > result) result = matrixPaths[i][j];

  return result;
}
