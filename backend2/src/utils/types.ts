type SnakeToCamelCase<T extends string> = T extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<SnakeToCamelCase<U>>}`
  : T;
/**
 * e.g. camel_to_snake -> camelToSnake
 */
export type SnakeToCamel<T extends object> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]: T[K] extends object
    ? SnakeToCamel<T[K]>
    : T[K];
};

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;

/**
 * e.g. camelToSnake -> camel_to_snake
 */
export type CamelToSnake<T extends object> = {
  [K in keyof T as `${CamelToSnakeCase<string & K>}`]: T[K] extends object
    ? CamelToSnake<T[K]>
    : T[K];
};

// TODO: After defining KebabToCamel and PascalToCamel
// type ToCamelCase<T extends string> = {};

// TODO: After defining KebabToSnake and PascalToSnake
// type ToSnakeCase<T extends string> = {};
