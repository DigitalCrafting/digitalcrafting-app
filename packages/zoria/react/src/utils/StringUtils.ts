export const StringUtils = {
    isEmpty: (value: string) => {
        return !value || !value.trim();
    },

    capitalizeWord: (word: string) => {
        if (typeof word !== 'string' || word.length === 0) return '';
        return word[0].toUpperCase() + word.slice(1);
    },

    toPascalCase: (word: string, delim: string = '-') => {
      return word.split(delim).map(StringUtils.capitalizeWord).join('');
    }
}

