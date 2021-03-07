type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export function mutable<T>(value: T) {
  return value as Mutable<T>;
}
