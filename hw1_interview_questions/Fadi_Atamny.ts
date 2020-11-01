/**
 * Function to find the minimum substring window
 *
 * @param {string} s
 * @param {string} t
 *
 * @return {string}
 */
const minimumWindow = (s: string, t: string): string => {
    let right: number = 0;
    let left: number = 0;
    let minStart: number = Number.NEGATIVE_INFINITY;
    let minEnd: number = Number.POSITIVE_INFINITY;
    let frequencyT: Map<string, number> = new Map<string, number>();
    let frequencyS: Map<string, number> = new Map<string, number>();
    let letterCount: number = 0;
    let matchCount: number = 0;

    if (t.length === 0) return '';

    for (let i = 0; i < t.length; ++i) {
        const val = frequencyT.get(t[i]);
        if (!val) {
            frequencyT.set(t[i], 1);
            letterCount++;
        } else frequencyT.set(t[i], val + 1);
    }

    if (s.length < letterCount) return '';

    while (right < s.length) {
        let fsValue = frequencyS.get(s[right]);
        if (!fsValue) {
            frequencyS.set(s[right], 1);
            fsValue = 1;
        } else {
            frequencyS.set(s[right], fsValue + 1);
            fsValue++;
        }
        
        const ftValue = frequencyT.get(s[right]);
        if (ftValue && fsValue === ftValue) matchCount++;

        while (left <= right && matchCount === letterCount) {
            const tmpC = s[left];
            if (right - left < minEnd - minStart) {
                minEnd = right;
                minStart = left;
            }

            const tmpFT = frequencyT.get(tmpC);
            let tmpST = frequencyS.get(tmpC);
            if (tmpST) {
                frequencyS.set(tmpC, tmpST - 1);
                tmpST--;
                if (tmpFT && tmpST < tmpFT) matchCount--;
            }

            left++;
        }

        right++;
    }

    return s.substring(minStart, minEnd + 1);
};

export { minimumWindow };
