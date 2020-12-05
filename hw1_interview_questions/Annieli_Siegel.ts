const expressiveWord = (S: string, words: Array<string>) => {
    let res: number = 0;
    words.forEach((word: string) => {
        if (checkWord(S, word))
            res++;
    });
    return res;
};

const checkWord = (S: string, word: string): boolean => {
    let n: number = S.length;
    let m: number = word.length;
    let j: number = 0;

    for(let i = 0; i < n; i++)
    {
        if(j < m && S[i] == word[j]) j++;
        else if( i > 1 && S[i-2] == S[i-1] && S[i-1] == S[i]) {}
        else if (0 < i && i < n - 1 && S[i - 1] == S[i] && S[i] == S[i + 1]) {}
        else return false;
    }

    return j == m;
};