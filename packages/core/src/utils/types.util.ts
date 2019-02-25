export type Primitive = string | number | boolean | undefined | null;
export type DeepReadonly<T> = T extends Primitive ? T : DeepReadonlyObject<T>;
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
};
