export function capitalizeWord(word: string) {
    if (typeof word !== 'string' || word.length === 0) return '';
    return word[0].toUpperCase() + word.slice(1);
}