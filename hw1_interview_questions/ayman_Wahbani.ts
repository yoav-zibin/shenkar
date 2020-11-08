/**
implement a revers: The function receives a certain string and returns its inverse.
Example: revers("abab") = "baba".
 */
export function revers(str: string): string {
    let result: string = "";
    let i : number = 0;
    for( i = str.length - 1; i >= 0; i-- ){
        result += str[i]; 
    }
    return result;
}
  