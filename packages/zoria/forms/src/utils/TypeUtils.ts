type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type NonTraversable = Primitive | Function | Date | RegExp | readonly any[];

export type ObjectPaths<T> = {
    [K in keyof T & string]: T[K] extends NonTraversable ? K : K | `${K}.${ObjectPaths<T[K]>}`;
}[keyof T & string]