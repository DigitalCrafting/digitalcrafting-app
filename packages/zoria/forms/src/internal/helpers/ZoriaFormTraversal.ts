export const PATH_DELIMITER = '.';

export function getNextDelimiterPos(path: string, currentNonDelimPos: number): number {
    return path.indexOf(PATH_DELIMITER, currentNonDelimPos);
}