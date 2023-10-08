type OrNull<T> = T | null;
type OrNil<T> = OrNull<T> | undefined;
type ValueOf<T> = T[keyof T];
