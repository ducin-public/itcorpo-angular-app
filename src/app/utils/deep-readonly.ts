/**
 * DeepReadonly<T> — recursively freeze a type.
 *
 * Combines the edge-case coverage of:
 * - type-fest `ReadonlyDeep` (tuples, overloaded fns, constructors, callable objects)
 * - ts-essentials `DeepReadonly` (Promise, Map/Set/WeakMap/WeakSet, unknown)
 *
 * @see https://github.com/sindresorhus/type-fest/blob/main/source/readonly-deep.d.ts
 * @see https://github.com/ts-essentials/ts-essentials/blob/master/lib/deep-readonly/index.ts
 */

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/** Types we must not map over — `keyof Date` / `keyof RegExp` is a disaster. */
type BuiltIn =
  | Primitive
  | void
  | Date
  | RegExp
  | Error
  | ArrayBuffer
  | SharedArrayBuffer
  | DataView
  | ArrayBufferView;

type IsAny<T> = 0 extends 1 & T ? true : false;

type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;

/**
 * Overloads cannot be reconstructed (TS#29732). Detect 2+ distinct call signatures.
 * A single signature infers the same args twice; overloads infer different ones.
 */
type HasMultipleCallSignatures<T extends (...arguments_: never[]) => unknown> =
  T extends { (...arguments_: infer A): unknown; (...arguments_: infer B): unknown }
    ? B extends A
      ? A extends B
        ? false
        : true
      : true
    : false;

type DeepReadonlyObject<T extends object> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

type DeepReadonlyFunction<T extends (...arguments_: never[]) => unknown> =
  // Plain functions have `keyof T = never` → mapped type is `{}`.
  {} extends DeepReadonlyObject<T>
    ? T
    : HasMultipleCallSignatures<T> extends true
      ? T
      : ((...arguments_: Parameters<T>) => ReturnType<T>) & DeepReadonlyObject<T>;

type DeepReadonlyMap<K, V> = ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>;
type DeepReadonlySet<U> = ReadonlySet<DeepReadonly<U>>;

export type DeepReadonly<T> =
  // `any` takes both branches of every `extends` → union explosion / recursion.
  IsAny<T> extends true
    ? T
    : IsUnknown<T> extends true
      ? unknown
      : T extends BuiltIn
        ? T
        // Leave class constructors intact so `new C()` still works.
        : T extends abstract new (...arguments_: never[]) => unknown
          ? T
          : T extends (...arguments_: never[]) => unknown
            ? DeepReadonlyFunction<T>
            : T extends Promise<infer U>
              ? Promise<DeepReadonly<U>>
              : T extends WeakMap<infer K, infer V>
                ? WeakMap<DeepReadonly<K> & WeakKey, DeepReadonly<V>>
                : T extends WeakSet<infer U>
                  ? WeakSet<DeepReadonly<U> & WeakKey>
                  : T extends Readonly<ReadonlyMap<infer K, infer V>>
                    ? DeepReadonlyMap<K, V>
                    : T extends Readonly<ReadonlySet<infer U>>
                      ? DeepReadonlySet<U>
                      // Empty / `readonly [...never[]]` (shows up in recursive tuple walks).
                      : T extends readonly [] | readonly [...never[]]
                        ? readonly []
                        : T extends readonly [infer U, ...infer V]
                          ? readonly [DeepReadonly<U>, ...DeepReadonly<V>]
                          // Leading-rest tuples: `[...string[], number]`.
                          : T extends readonly [...infer U, infer V]
                            ? readonly [...DeepReadonly<U>, DeepReadonly<V>]
                            : T extends ReadonlyArray<infer U>
                              ? ReadonlyArray<DeepReadonly<U>>
                              : T extends object
                                ? DeepReadonlyObject<T>
                                : T;

// ---------------------------------------------------------------------------
// Compile-time tests (erased). A failing Expect<> is a type error.
// ---------------------------------------------------------------------------

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

type Expect<T extends true> = T;

declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

type Overloaded = {
  (foo: number): string;
  (foo: string, bar: number): number;
};

type Namespace = {
  (foo: number): string;
  baz: boolean[];
};

type _tests = [
  // primitives / top types
  Expect<Equal<DeepReadonly<string>, string>>,
  Expect<Equal<DeepReadonly<number>, number>>,
  Expect<Equal<DeepReadonly<boolean>, boolean>>,
  Expect<Equal<DeepReadonly<bigint>, bigint>>,
  Expect<Equal<DeepReadonly<symbol>, symbol>>,
  Expect<Equal<DeepReadonly<null>, null>>,
  Expect<Equal<DeepReadonly<undefined>, undefined>>,
  Expect<Equal<DeepReadonly<void>, void>>,
  Expect<Equal<DeepReadonly<never>, never>>,
  Expect<Equal<DeepReadonly<unknown>, unknown>>,
  Expect<Equal<DeepReadonly<any>, any>>,

  // branded primitives stay branded (not stripped to number)
  Expect<Equal<DeepReadonly<Brand<number, 'Money'>>, Brand<number, 'Money'>>>,

  // built-ins are not mapped
  Expect<Equal<DeepReadonly<Date>, Date>>,
  Expect<Equal<DeepReadonly<RegExp>, RegExp>>,
  Expect<Equal<DeepReadonly<Error>, Error>>,

  // nested objects
  Expect<
    Equal<
      DeepReadonly<{ a: { b: number } }>,
      { readonly a: { readonly b: number } }
    >
  >,

  // optional properties keep `?`
  Expect<
    Equal<
      DeepReadonly<{ a?: { b: number } }>,
      { readonly a?: { readonly b: number } }
    >
  >,

  // unions distribute
  Expect<
    Equal<
      DeepReadonly<{ a: number } | { b: string }>,
      { readonly a: number } | { readonly b: string }
    >
  >,

  // arrays vs tuples
  Expect<Equal<DeepReadonly<string[]>, ReadonlyArray<string>>>,
  Expect<Equal<DeepReadonly<readonly string[]>, ReadonlyArray<string>>>,
  Expect<Equal<DeepReadonly<[]>, readonly []>>,
  Expect<Equal<DeepReadonly<[string]>, readonly [string]>>,
  Expect<
    Equal<
      DeepReadonly<[{ a: number }, { b: string }]>,
      readonly [{ readonly a: number }, { readonly b: string }]
    >
  >,
  Expect<Equal<DeepReadonly<[string, ...number[]]>, readonly [string, ...number[]]>>,
  Expect<Equal<DeepReadonly<[...string[], number]>, readonly [...string[], number]>>,

  // Map / Set / Weak*
  Expect<
    Equal<
      DeepReadonly<Map<string, { a: number }>>,
      ReadonlyMap<string, { readonly a: number }>
    >
  >,
  Expect<
    Equal<
      DeepReadonly<Set<{ a: number }>>,
      ReadonlySet<{ readonly a: number }>
    >
  >,
  Expect<
    Equal<
      DeepReadonly<ReadonlyMap<string, { a: number }>>,
      ReadonlyMap<string, { readonly a: number }>
    >
  >,

  // Promise unwraps then rewraps
  Expect<
    Equal<DeepReadonly<Promise<{ a: number }>>, Promise<{ readonly a: number }>>
  >,

  // functions: signature preserved; extra props frozen; return type NOT walked
  Expect<Equal<DeepReadonly<() => Map<string, number[]>>, () => Map<string, number[]>>>,
  Expect<
    Equal<
      DeepReadonly<Namespace>,
      ((foo: number) => string) & { readonly baz: ReadonlyArray<boolean> }
    >
  >,
  // overloads cannot be rebuilt — leave as-is
  Expect<Equal<DeepReadonly<Overloaded>, Overloaded>>,

  // constructors stay constructable
  Expect<Equal<DeepReadonly<typeof Date>, typeof Date>>,

  // index signatures
  Expect<
    Equal<
      DeepReadonly<{ [key: string]: { x: number } }>,
      { readonly [key: string]: { readonly x: number } }
    >
  >,

  // already-readonly is idempotent
  Expect<
    Equal<
      DeepReadonly<{ readonly a: { readonly b: number } }>,
      { readonly a: { readonly b: number } }
    >
  >,
];
