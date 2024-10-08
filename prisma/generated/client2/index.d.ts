
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Hint
 * 
 */
export type Hint = $Result.DefaultSelection<Prisma.$HintPayload>
/**
 * Model Hint_Bullet
 * 
 */
export type Hint_Bullet = $Result.DefaultSelection<Prisma.$Hint_BulletPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tasks
 * const tasks = await prisma.task.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tasks
   * const tasks = await prisma.task.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs>;

  /**
   * `prisma.hint`: Exposes CRUD operations for the **Hint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hints
    * const hints = await prisma.hint.findMany()
    * ```
    */
  get hint(): Prisma.HintDelegate<ExtArgs>;

  /**
   * `prisma.hint_Bullet`: Exposes CRUD operations for the **Hint_Bullet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hint_Bullets
    * const hint_Bullets = await prisma.hint_Bullet.findMany()
    * ```
    */
  get hint_Bullet(): Prisma.Hint_BulletDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.19.1
   * Query Engine version: 69d742ee20b815d88e17e54db4a2a7a3b30324e3
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Task: 'Task',
    Hint: 'Hint',
    Hint_Bullet: 'Hint_Bullet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "task" | "hint" | "hint_Bullet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Hint: {
        payload: Prisma.$HintPayload<ExtArgs>
        fields: Prisma.HintFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HintFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HintFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>
          }
          findFirst: {
            args: Prisma.HintFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HintFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>
          }
          findMany: {
            args: Prisma.HintFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>[]
          }
          create: {
            args: Prisma.HintCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>
          }
          createMany: {
            args: Prisma.HintCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HintDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>
          }
          update: {
            args: Prisma.HintUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>
          }
          deleteMany: {
            args: Prisma.HintDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HintUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HintUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HintPayload>
          }
          aggregate: {
            args: Prisma.HintAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHint>
          }
          groupBy: {
            args: Prisma.HintGroupByArgs<ExtArgs>
            result: $Utils.Optional<HintGroupByOutputType>[]
          }
          count: {
            args: Prisma.HintCountArgs<ExtArgs>
            result: $Utils.Optional<HintCountAggregateOutputType> | number
          }
        }
      }
      Hint_Bullet: {
        payload: Prisma.$Hint_BulletPayload<ExtArgs>
        fields: Prisma.Hint_BulletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Hint_BulletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Hint_BulletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>
          }
          findFirst: {
            args: Prisma.Hint_BulletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Hint_BulletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>
          }
          findMany: {
            args: Prisma.Hint_BulletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>[]
          }
          create: {
            args: Prisma.Hint_BulletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>
          }
          createMany: {
            args: Prisma.Hint_BulletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Hint_BulletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>
          }
          update: {
            args: Prisma.Hint_BulletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>
          }
          deleteMany: {
            args: Prisma.Hint_BulletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Hint_BulletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Hint_BulletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Hint_BulletPayload>
          }
          aggregate: {
            args: Prisma.Hint_BulletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHint_Bullet>
          }
          groupBy: {
            args: Prisma.Hint_BulletGroupByArgs<ExtArgs>
            result: $Utils.Optional<Hint_BulletGroupByOutputType>[]
          }
          count: {
            args: Prisma.Hint_BulletCountArgs<ExtArgs>
            result: $Utils.Optional<Hint_BulletCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type HintCountOutputType
   */

  export type HintCountOutputType = {
    bullets: number
  }

  export type HintCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bullets?: boolean | HintCountOutputTypeCountBulletsArgs
  }

  // Custom InputTypes
  /**
   * HintCountOutputType without action
   */
  export type HintCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HintCountOutputType
     */
    select?: HintCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HintCountOutputType without action
   */
  export type HintCountOutputTypeCountBulletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Hint_BulletWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    difficulty: number | null
    attempts: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    difficulty: number | null
    attempts: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    task: string | null
    answer: string | null
    comments: string | null
    difficulty: number | null
    status: string | null
    completed: boolean | null
    attempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    task: string | null
    answer: string | null
    comments: string | null
    difficulty: number | null
    status: string | null
    completed: boolean | null
    attempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    task: number
    answer: number
    comments: number
    difficulty: number
    status: number
    completed: number
    attempts: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    difficulty?: true
    attempts?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    difficulty?: true
    attempts?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    task?: true
    answer?: true
    comments?: true
    difficulty?: true
    status?: true
    completed?: true
    attempts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    task?: true
    answer?: true
    comments?: true
    difficulty?: true
    status?: true
    completed?: true
    attempts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    task?: true
    answer?: true
    comments?: true
    difficulty?: true
    status?: true
    completed?: true
    attempts?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    task: string
    answer: string
    comments: string
    difficulty: number
    status: string
    completed: boolean
    attempts: number
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    task?: boolean
    answer?: boolean
    comments?: boolean
    difficulty?: boolean
    status?: boolean
    completed?: boolean
    attempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["task"]>


  export type TaskSelectScalar = {
    id?: boolean
    task?: boolean
    answer?: boolean
    comments?: boolean
    difficulty?: boolean
    status?: boolean
    completed?: boolean
    attempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      task: string
      answer: string
      comments: string
      difficulty: number
      status: string
      completed: boolean
      attempts: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */ 
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly task: FieldRef<"Task", 'String'>
    readonly answer: FieldRef<"Task", 'String'>
    readonly comments: FieldRef<"Task", 'String'>
    readonly difficulty: FieldRef<"Task", 'Int'>
    readonly status: FieldRef<"Task", 'String'>
    readonly completed: FieldRef<"Task", 'Boolean'>
    readonly attempts: FieldRef<"Task", 'Int'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
  }


  /**
   * Model Hint
   */

  export type AggregateHint = {
    _count: HintCountAggregateOutputType | null
    _avg: HintAvgAggregateOutputType | null
    _sum: HintSumAggregateOutputType | null
    _min: HintMinAggregateOutputType | null
    _max: HintMaxAggregateOutputType | null
  }

  export type HintAvgAggregateOutputType = {
    id: number | null
  }

  export type HintSumAggregateOutputType = {
    id: number | null
  }

  export type HintMinAggregateOutputType = {
    id: number | null
    hint: string | null
    createdAt: Date | null
  }

  export type HintMaxAggregateOutputType = {
    id: number | null
    hint: string | null
    createdAt: Date | null
  }

  export type HintCountAggregateOutputType = {
    id: number
    hint: number
    createdAt: number
    _all: number
  }


  export type HintAvgAggregateInputType = {
    id?: true
  }

  export type HintSumAggregateInputType = {
    id?: true
  }

  export type HintMinAggregateInputType = {
    id?: true
    hint?: true
    createdAt?: true
  }

  export type HintMaxAggregateInputType = {
    id?: true
    hint?: true
    createdAt?: true
  }

  export type HintCountAggregateInputType = {
    id?: true
    hint?: true
    createdAt?: true
    _all?: true
  }

  export type HintAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hint to aggregate.
     */
    where?: HintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hints to fetch.
     */
    orderBy?: HintOrderByWithRelationInput | HintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hints
    **/
    _count?: true | HintCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HintAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HintSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HintMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HintMaxAggregateInputType
  }

  export type GetHintAggregateType<T extends HintAggregateArgs> = {
        [P in keyof T & keyof AggregateHint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHint[P]>
      : GetScalarType<T[P], AggregateHint[P]>
  }




  export type HintGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HintWhereInput
    orderBy?: HintOrderByWithAggregationInput | HintOrderByWithAggregationInput[]
    by: HintScalarFieldEnum[] | HintScalarFieldEnum
    having?: HintScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HintCountAggregateInputType | true
    _avg?: HintAvgAggregateInputType
    _sum?: HintSumAggregateInputType
    _min?: HintMinAggregateInputType
    _max?: HintMaxAggregateInputType
  }

  export type HintGroupByOutputType = {
    id: number
    hint: string
    createdAt: Date
    _count: HintCountAggregateOutputType | null
    _avg: HintAvgAggregateOutputType | null
    _sum: HintSumAggregateOutputType | null
    _min: HintMinAggregateOutputType | null
    _max: HintMaxAggregateOutputType | null
  }

  type GetHintGroupByPayload<T extends HintGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HintGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HintGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HintGroupByOutputType[P]>
            : GetScalarType<T[P], HintGroupByOutputType[P]>
        }
      >
    >


  export type HintSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hint?: boolean
    createdAt?: boolean
    bullets?: boolean | Hint$bulletsArgs<ExtArgs>
    _count?: boolean | HintCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hint"]>


  export type HintSelectScalar = {
    id?: boolean
    hint?: boolean
    createdAt?: boolean
  }

  export type HintInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bullets?: boolean | Hint$bulletsArgs<ExtArgs>
    _count?: boolean | HintCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $HintPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hint"
    objects: {
      bullets: Prisma.$Hint_BulletPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hint: string
      createdAt: Date
    }, ExtArgs["result"]["hint"]>
    composites: {}
  }

  type HintGetPayload<S extends boolean | null | undefined | HintDefaultArgs> = $Result.GetResult<Prisma.$HintPayload, S>

  type HintCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HintFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HintCountAggregateInputType | true
    }

  export interface HintDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hint'], meta: { name: 'Hint' } }
    /**
     * Find zero or one Hint that matches the filter.
     * @param {HintFindUniqueArgs} args - Arguments to find a Hint
     * @example
     * // Get one Hint
     * const hint = await prisma.hint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HintFindUniqueArgs>(args: SelectSubset<T, HintFindUniqueArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Hint that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HintFindUniqueOrThrowArgs} args - Arguments to find a Hint
     * @example
     * // Get one Hint
     * const hint = await prisma.hint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HintFindUniqueOrThrowArgs>(args: SelectSubset<T, HintFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Hint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintFindFirstArgs} args - Arguments to find a Hint
     * @example
     * // Get one Hint
     * const hint = await prisma.hint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HintFindFirstArgs>(args?: SelectSubset<T, HintFindFirstArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Hint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintFindFirstOrThrowArgs} args - Arguments to find a Hint
     * @example
     * // Get one Hint
     * const hint = await prisma.hint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HintFindFirstOrThrowArgs>(args?: SelectSubset<T, HintFindFirstOrThrowArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Hints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hints
     * const hints = await prisma.hint.findMany()
     * 
     * // Get first 10 Hints
     * const hints = await prisma.hint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hintWithIdOnly = await prisma.hint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HintFindManyArgs>(args?: SelectSubset<T, HintFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Hint.
     * @param {HintCreateArgs} args - Arguments to create a Hint.
     * @example
     * // Create one Hint
     * const Hint = await prisma.hint.create({
     *   data: {
     *     // ... data to create a Hint
     *   }
     * })
     * 
     */
    create<T extends HintCreateArgs>(args: SelectSubset<T, HintCreateArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Hints.
     * @param {HintCreateManyArgs} args - Arguments to create many Hints.
     * @example
     * // Create many Hints
     * const hint = await prisma.hint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HintCreateManyArgs>(args?: SelectSubset<T, HintCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Hint.
     * @param {HintDeleteArgs} args - Arguments to delete one Hint.
     * @example
     * // Delete one Hint
     * const Hint = await prisma.hint.delete({
     *   where: {
     *     // ... filter to delete one Hint
     *   }
     * })
     * 
     */
    delete<T extends HintDeleteArgs>(args: SelectSubset<T, HintDeleteArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Hint.
     * @param {HintUpdateArgs} args - Arguments to update one Hint.
     * @example
     * // Update one Hint
     * const hint = await prisma.hint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HintUpdateArgs>(args: SelectSubset<T, HintUpdateArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Hints.
     * @param {HintDeleteManyArgs} args - Arguments to filter Hints to delete.
     * @example
     * // Delete a few Hints
     * const { count } = await prisma.hint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HintDeleteManyArgs>(args?: SelectSubset<T, HintDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hints
     * const hint = await prisma.hint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HintUpdateManyArgs>(args: SelectSubset<T, HintUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Hint.
     * @param {HintUpsertArgs} args - Arguments to update or create a Hint.
     * @example
     * // Update or create a Hint
     * const hint = await prisma.hint.upsert({
     *   create: {
     *     // ... data to create a Hint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hint we want to update
     *   }
     * })
     */
    upsert<T extends HintUpsertArgs>(args: SelectSubset<T, HintUpsertArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Hints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintCountArgs} args - Arguments to filter Hints to count.
     * @example
     * // Count the number of Hints
     * const count = await prisma.hint.count({
     *   where: {
     *     // ... the filter for the Hints we want to count
     *   }
     * })
    **/
    count<T extends HintCountArgs>(
      args?: Subset<T, HintCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HintCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HintAggregateArgs>(args: Subset<T, HintAggregateArgs>): Prisma.PrismaPromise<GetHintAggregateType<T>>

    /**
     * Group by Hint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HintGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HintGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HintGroupByArgs['orderBy'] }
        : { orderBy?: HintGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HintGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHintGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hint model
   */
  readonly fields: HintFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HintClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bullets<T extends Hint$bulletsArgs<ExtArgs> = {}>(args?: Subset<T, Hint$bulletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hint model
   */ 
  interface HintFieldRefs {
    readonly id: FieldRef<"Hint", 'Int'>
    readonly hint: FieldRef<"Hint", 'String'>
    readonly createdAt: FieldRef<"Hint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Hint findUnique
   */
  export type HintFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * Filter, which Hint to fetch.
     */
    where: HintWhereUniqueInput
  }

  /**
   * Hint findUniqueOrThrow
   */
  export type HintFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * Filter, which Hint to fetch.
     */
    where: HintWhereUniqueInput
  }

  /**
   * Hint findFirst
   */
  export type HintFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * Filter, which Hint to fetch.
     */
    where?: HintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hints to fetch.
     */
    orderBy?: HintOrderByWithRelationInput | HintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hints.
     */
    cursor?: HintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hints.
     */
    distinct?: HintScalarFieldEnum | HintScalarFieldEnum[]
  }

  /**
   * Hint findFirstOrThrow
   */
  export type HintFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * Filter, which Hint to fetch.
     */
    where?: HintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hints to fetch.
     */
    orderBy?: HintOrderByWithRelationInput | HintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hints.
     */
    cursor?: HintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hints.
     */
    distinct?: HintScalarFieldEnum | HintScalarFieldEnum[]
  }

  /**
   * Hint findMany
   */
  export type HintFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * Filter, which Hints to fetch.
     */
    where?: HintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hints to fetch.
     */
    orderBy?: HintOrderByWithRelationInput | HintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hints.
     */
    cursor?: HintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hints.
     */
    skip?: number
    distinct?: HintScalarFieldEnum | HintScalarFieldEnum[]
  }

  /**
   * Hint create
   */
  export type HintCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * The data needed to create a Hint.
     */
    data: XOR<HintCreateInput, HintUncheckedCreateInput>
  }

  /**
   * Hint createMany
   */
  export type HintCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hints.
     */
    data: HintCreateManyInput | HintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hint update
   */
  export type HintUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * The data needed to update a Hint.
     */
    data: XOR<HintUpdateInput, HintUncheckedUpdateInput>
    /**
     * Choose, which Hint to update.
     */
    where: HintWhereUniqueInput
  }

  /**
   * Hint updateMany
   */
  export type HintUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hints.
     */
    data: XOR<HintUpdateManyMutationInput, HintUncheckedUpdateManyInput>
    /**
     * Filter which Hints to update
     */
    where?: HintWhereInput
  }

  /**
   * Hint upsert
   */
  export type HintUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * The filter to search for the Hint to update in case it exists.
     */
    where: HintWhereUniqueInput
    /**
     * In case the Hint found by the `where` argument doesn't exist, create a new Hint with this data.
     */
    create: XOR<HintCreateInput, HintUncheckedCreateInput>
    /**
     * In case the Hint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HintUpdateInput, HintUncheckedUpdateInput>
  }

  /**
   * Hint delete
   */
  export type HintDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
    /**
     * Filter which Hint to delete.
     */
    where: HintWhereUniqueInput
  }

  /**
   * Hint deleteMany
   */
  export type HintDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hints to delete
     */
    where?: HintWhereInput
  }

  /**
   * Hint.bullets
   */
  export type Hint$bulletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    where?: Hint_BulletWhereInput
    orderBy?: Hint_BulletOrderByWithRelationInput | Hint_BulletOrderByWithRelationInput[]
    cursor?: Hint_BulletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Hint_BulletScalarFieldEnum | Hint_BulletScalarFieldEnum[]
  }

  /**
   * Hint without action
   */
  export type HintDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint
     */
    select?: HintSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HintInclude<ExtArgs> | null
  }


  /**
   * Model Hint_Bullet
   */

  export type AggregateHint_Bullet = {
    _count: Hint_BulletCountAggregateOutputType | null
    _avg: Hint_BulletAvgAggregateOutputType | null
    _sum: Hint_BulletSumAggregateOutputType | null
    _min: Hint_BulletMinAggregateOutputType | null
    _max: Hint_BulletMaxAggregateOutputType | null
  }

  export type Hint_BulletAvgAggregateOutputType = {
    id: number | null
    hintId: number | null
  }

  export type Hint_BulletSumAggregateOutputType = {
    id: number | null
    hintId: number | null
  }

  export type Hint_BulletMinAggregateOutputType = {
    id: number | null
    bullet: string | null
    createdAt: Date | null
    hintId: number | null
  }

  export type Hint_BulletMaxAggregateOutputType = {
    id: number | null
    bullet: string | null
    createdAt: Date | null
    hintId: number | null
  }

  export type Hint_BulletCountAggregateOutputType = {
    id: number
    bullet: number
    createdAt: number
    hintId: number
    _all: number
  }


  export type Hint_BulletAvgAggregateInputType = {
    id?: true
    hintId?: true
  }

  export type Hint_BulletSumAggregateInputType = {
    id?: true
    hintId?: true
  }

  export type Hint_BulletMinAggregateInputType = {
    id?: true
    bullet?: true
    createdAt?: true
    hintId?: true
  }

  export type Hint_BulletMaxAggregateInputType = {
    id?: true
    bullet?: true
    createdAt?: true
    hintId?: true
  }

  export type Hint_BulletCountAggregateInputType = {
    id?: true
    bullet?: true
    createdAt?: true
    hintId?: true
    _all?: true
  }

  export type Hint_BulletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hint_Bullet to aggregate.
     */
    where?: Hint_BulletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hint_Bullets to fetch.
     */
    orderBy?: Hint_BulletOrderByWithRelationInput | Hint_BulletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Hint_BulletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hint_Bullets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hint_Bullets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hint_Bullets
    **/
    _count?: true | Hint_BulletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Hint_BulletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Hint_BulletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Hint_BulletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Hint_BulletMaxAggregateInputType
  }

  export type GetHint_BulletAggregateType<T extends Hint_BulletAggregateArgs> = {
        [P in keyof T & keyof AggregateHint_Bullet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHint_Bullet[P]>
      : GetScalarType<T[P], AggregateHint_Bullet[P]>
  }




  export type Hint_BulletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Hint_BulletWhereInput
    orderBy?: Hint_BulletOrderByWithAggregationInput | Hint_BulletOrderByWithAggregationInput[]
    by: Hint_BulletScalarFieldEnum[] | Hint_BulletScalarFieldEnum
    having?: Hint_BulletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Hint_BulletCountAggregateInputType | true
    _avg?: Hint_BulletAvgAggregateInputType
    _sum?: Hint_BulletSumAggregateInputType
    _min?: Hint_BulletMinAggregateInputType
    _max?: Hint_BulletMaxAggregateInputType
  }

  export type Hint_BulletGroupByOutputType = {
    id: number
    bullet: string
    createdAt: Date
    hintId: number
    _count: Hint_BulletCountAggregateOutputType | null
    _avg: Hint_BulletAvgAggregateOutputType | null
    _sum: Hint_BulletSumAggregateOutputType | null
    _min: Hint_BulletMinAggregateOutputType | null
    _max: Hint_BulletMaxAggregateOutputType | null
  }

  type GetHint_BulletGroupByPayload<T extends Hint_BulletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Hint_BulletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Hint_BulletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Hint_BulletGroupByOutputType[P]>
            : GetScalarType<T[P], Hint_BulletGroupByOutputType[P]>
        }
      >
    >


  export type Hint_BulletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bullet?: boolean
    createdAt?: boolean
    hintId?: boolean
    Hint?: boolean | HintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hint_Bullet"]>


  export type Hint_BulletSelectScalar = {
    id?: boolean
    bullet?: boolean
    createdAt?: boolean
    hintId?: boolean
  }

  export type Hint_BulletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Hint?: boolean | HintDefaultArgs<ExtArgs>
  }

  export type $Hint_BulletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hint_Bullet"
    objects: {
      Hint: Prisma.$HintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bullet: string
      createdAt: Date
      hintId: number
    }, ExtArgs["result"]["hint_Bullet"]>
    composites: {}
  }

  type Hint_BulletGetPayload<S extends boolean | null | undefined | Hint_BulletDefaultArgs> = $Result.GetResult<Prisma.$Hint_BulletPayload, S>

  type Hint_BulletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<Hint_BulletFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Hint_BulletCountAggregateInputType | true
    }

  export interface Hint_BulletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hint_Bullet'], meta: { name: 'Hint_Bullet' } }
    /**
     * Find zero or one Hint_Bullet that matches the filter.
     * @param {Hint_BulletFindUniqueArgs} args - Arguments to find a Hint_Bullet
     * @example
     * // Get one Hint_Bullet
     * const hint_Bullet = await prisma.hint_Bullet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Hint_BulletFindUniqueArgs>(args: SelectSubset<T, Hint_BulletFindUniqueArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Hint_Bullet that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {Hint_BulletFindUniqueOrThrowArgs} args - Arguments to find a Hint_Bullet
     * @example
     * // Get one Hint_Bullet
     * const hint_Bullet = await prisma.hint_Bullet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Hint_BulletFindUniqueOrThrowArgs>(args: SelectSubset<T, Hint_BulletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Hint_Bullet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletFindFirstArgs} args - Arguments to find a Hint_Bullet
     * @example
     * // Get one Hint_Bullet
     * const hint_Bullet = await prisma.hint_Bullet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Hint_BulletFindFirstArgs>(args?: SelectSubset<T, Hint_BulletFindFirstArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Hint_Bullet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletFindFirstOrThrowArgs} args - Arguments to find a Hint_Bullet
     * @example
     * // Get one Hint_Bullet
     * const hint_Bullet = await prisma.hint_Bullet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Hint_BulletFindFirstOrThrowArgs>(args?: SelectSubset<T, Hint_BulletFindFirstOrThrowArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Hint_Bullets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hint_Bullets
     * const hint_Bullets = await prisma.hint_Bullet.findMany()
     * 
     * // Get first 10 Hint_Bullets
     * const hint_Bullets = await prisma.hint_Bullet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hint_BulletWithIdOnly = await prisma.hint_Bullet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Hint_BulletFindManyArgs>(args?: SelectSubset<T, Hint_BulletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Hint_Bullet.
     * @param {Hint_BulletCreateArgs} args - Arguments to create a Hint_Bullet.
     * @example
     * // Create one Hint_Bullet
     * const Hint_Bullet = await prisma.hint_Bullet.create({
     *   data: {
     *     // ... data to create a Hint_Bullet
     *   }
     * })
     * 
     */
    create<T extends Hint_BulletCreateArgs>(args: SelectSubset<T, Hint_BulletCreateArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Hint_Bullets.
     * @param {Hint_BulletCreateManyArgs} args - Arguments to create many Hint_Bullets.
     * @example
     * // Create many Hint_Bullets
     * const hint_Bullet = await prisma.hint_Bullet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Hint_BulletCreateManyArgs>(args?: SelectSubset<T, Hint_BulletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Hint_Bullet.
     * @param {Hint_BulletDeleteArgs} args - Arguments to delete one Hint_Bullet.
     * @example
     * // Delete one Hint_Bullet
     * const Hint_Bullet = await prisma.hint_Bullet.delete({
     *   where: {
     *     // ... filter to delete one Hint_Bullet
     *   }
     * })
     * 
     */
    delete<T extends Hint_BulletDeleteArgs>(args: SelectSubset<T, Hint_BulletDeleteArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Hint_Bullet.
     * @param {Hint_BulletUpdateArgs} args - Arguments to update one Hint_Bullet.
     * @example
     * // Update one Hint_Bullet
     * const hint_Bullet = await prisma.hint_Bullet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Hint_BulletUpdateArgs>(args: SelectSubset<T, Hint_BulletUpdateArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Hint_Bullets.
     * @param {Hint_BulletDeleteManyArgs} args - Arguments to filter Hint_Bullets to delete.
     * @example
     * // Delete a few Hint_Bullets
     * const { count } = await prisma.hint_Bullet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Hint_BulletDeleteManyArgs>(args?: SelectSubset<T, Hint_BulletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hint_Bullets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hint_Bullets
     * const hint_Bullet = await prisma.hint_Bullet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Hint_BulletUpdateManyArgs>(args: SelectSubset<T, Hint_BulletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Hint_Bullet.
     * @param {Hint_BulletUpsertArgs} args - Arguments to update or create a Hint_Bullet.
     * @example
     * // Update or create a Hint_Bullet
     * const hint_Bullet = await prisma.hint_Bullet.upsert({
     *   create: {
     *     // ... data to create a Hint_Bullet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hint_Bullet we want to update
     *   }
     * })
     */
    upsert<T extends Hint_BulletUpsertArgs>(args: SelectSubset<T, Hint_BulletUpsertArgs<ExtArgs>>): Prisma__Hint_BulletClient<$Result.GetResult<Prisma.$Hint_BulletPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Hint_Bullets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletCountArgs} args - Arguments to filter Hint_Bullets to count.
     * @example
     * // Count the number of Hint_Bullets
     * const count = await prisma.hint_Bullet.count({
     *   where: {
     *     // ... the filter for the Hint_Bullets we want to count
     *   }
     * })
    **/
    count<T extends Hint_BulletCountArgs>(
      args?: Subset<T, Hint_BulletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Hint_BulletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hint_Bullet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Hint_BulletAggregateArgs>(args: Subset<T, Hint_BulletAggregateArgs>): Prisma.PrismaPromise<GetHint_BulletAggregateType<T>>

    /**
     * Group by Hint_Bullet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Hint_BulletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Hint_BulletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Hint_BulletGroupByArgs['orderBy'] }
        : { orderBy?: Hint_BulletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Hint_BulletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHint_BulletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hint_Bullet model
   */
  readonly fields: Hint_BulletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hint_Bullet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Hint_BulletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Hint<T extends HintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HintDefaultArgs<ExtArgs>>): Prisma__HintClient<$Result.GetResult<Prisma.$HintPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hint_Bullet model
   */ 
  interface Hint_BulletFieldRefs {
    readonly id: FieldRef<"Hint_Bullet", 'Int'>
    readonly bullet: FieldRef<"Hint_Bullet", 'String'>
    readonly createdAt: FieldRef<"Hint_Bullet", 'DateTime'>
    readonly hintId: FieldRef<"Hint_Bullet", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Hint_Bullet findUnique
   */
  export type Hint_BulletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * Filter, which Hint_Bullet to fetch.
     */
    where: Hint_BulletWhereUniqueInput
  }

  /**
   * Hint_Bullet findUniqueOrThrow
   */
  export type Hint_BulletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * Filter, which Hint_Bullet to fetch.
     */
    where: Hint_BulletWhereUniqueInput
  }

  /**
   * Hint_Bullet findFirst
   */
  export type Hint_BulletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * Filter, which Hint_Bullet to fetch.
     */
    where?: Hint_BulletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hint_Bullets to fetch.
     */
    orderBy?: Hint_BulletOrderByWithRelationInput | Hint_BulletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hint_Bullets.
     */
    cursor?: Hint_BulletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hint_Bullets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hint_Bullets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hint_Bullets.
     */
    distinct?: Hint_BulletScalarFieldEnum | Hint_BulletScalarFieldEnum[]
  }

  /**
   * Hint_Bullet findFirstOrThrow
   */
  export type Hint_BulletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * Filter, which Hint_Bullet to fetch.
     */
    where?: Hint_BulletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hint_Bullets to fetch.
     */
    orderBy?: Hint_BulletOrderByWithRelationInput | Hint_BulletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hint_Bullets.
     */
    cursor?: Hint_BulletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hint_Bullets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hint_Bullets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hint_Bullets.
     */
    distinct?: Hint_BulletScalarFieldEnum | Hint_BulletScalarFieldEnum[]
  }

  /**
   * Hint_Bullet findMany
   */
  export type Hint_BulletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * Filter, which Hint_Bullets to fetch.
     */
    where?: Hint_BulletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hint_Bullets to fetch.
     */
    orderBy?: Hint_BulletOrderByWithRelationInput | Hint_BulletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hint_Bullets.
     */
    cursor?: Hint_BulletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hint_Bullets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hint_Bullets.
     */
    skip?: number
    distinct?: Hint_BulletScalarFieldEnum | Hint_BulletScalarFieldEnum[]
  }

  /**
   * Hint_Bullet create
   */
  export type Hint_BulletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * The data needed to create a Hint_Bullet.
     */
    data: XOR<Hint_BulletCreateInput, Hint_BulletUncheckedCreateInput>
  }

  /**
   * Hint_Bullet createMany
   */
  export type Hint_BulletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hint_Bullets.
     */
    data: Hint_BulletCreateManyInput | Hint_BulletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hint_Bullet update
   */
  export type Hint_BulletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * The data needed to update a Hint_Bullet.
     */
    data: XOR<Hint_BulletUpdateInput, Hint_BulletUncheckedUpdateInput>
    /**
     * Choose, which Hint_Bullet to update.
     */
    where: Hint_BulletWhereUniqueInput
  }

  /**
   * Hint_Bullet updateMany
   */
  export type Hint_BulletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hint_Bullets.
     */
    data: XOR<Hint_BulletUpdateManyMutationInput, Hint_BulletUncheckedUpdateManyInput>
    /**
     * Filter which Hint_Bullets to update
     */
    where?: Hint_BulletWhereInput
  }

  /**
   * Hint_Bullet upsert
   */
  export type Hint_BulletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * The filter to search for the Hint_Bullet to update in case it exists.
     */
    where: Hint_BulletWhereUniqueInput
    /**
     * In case the Hint_Bullet found by the `where` argument doesn't exist, create a new Hint_Bullet with this data.
     */
    create: XOR<Hint_BulletCreateInput, Hint_BulletUncheckedCreateInput>
    /**
     * In case the Hint_Bullet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Hint_BulletUpdateInput, Hint_BulletUncheckedUpdateInput>
  }

  /**
   * Hint_Bullet delete
   */
  export type Hint_BulletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
    /**
     * Filter which Hint_Bullet to delete.
     */
    where: Hint_BulletWhereUniqueInput
  }

  /**
   * Hint_Bullet deleteMany
   */
  export type Hint_BulletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hint_Bullets to delete
     */
    where?: Hint_BulletWhereInput
  }

  /**
   * Hint_Bullet without action
   */
  export type Hint_BulletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hint_Bullet
     */
    select?: Hint_BulletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Hint_BulletInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TaskScalarFieldEnum: {
    id: 'id',
    task: 'task',
    answer: 'answer',
    comments: 'comments',
    difficulty: 'difficulty',
    status: 'status',
    completed: 'completed',
    attempts: 'attempts',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const HintScalarFieldEnum: {
    id: 'id',
    hint: 'hint',
    createdAt: 'createdAt'
  };

  export type HintScalarFieldEnum = (typeof HintScalarFieldEnum)[keyof typeof HintScalarFieldEnum]


  export const Hint_BulletScalarFieldEnum: {
    id: 'id',
    bullet: 'bullet',
    createdAt: 'createdAt',
    hintId: 'hintId'
  };

  export type Hint_BulletScalarFieldEnum = (typeof Hint_BulletScalarFieldEnum)[keyof typeof Hint_BulletScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    task?: StringFilter<"Task"> | string
    answer?: StringFilter<"Task"> | string
    comments?: StringFilter<"Task"> | string
    difficulty?: IntFilter<"Task"> | number
    status?: StringFilter<"Task"> | string
    completed?: BoolFilter<"Task"> | boolean
    attempts?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    task?: SortOrder
    answer?: SortOrder
    comments?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    completed?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    task?: StringFilter<"Task"> | string
    answer?: StringFilter<"Task"> | string
    comments?: StringFilter<"Task"> | string
    difficulty?: IntFilter<"Task"> | number
    status?: StringFilter<"Task"> | string
    completed?: BoolFilter<"Task"> | boolean
    attempts?: IntFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    task?: SortOrder
    answer?: SortOrder
    comments?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    completed?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    task?: StringWithAggregatesFilter<"Task"> | string
    answer?: StringWithAggregatesFilter<"Task"> | string
    comments?: StringWithAggregatesFilter<"Task"> | string
    difficulty?: IntWithAggregatesFilter<"Task"> | number
    status?: StringWithAggregatesFilter<"Task"> | string
    completed?: BoolWithAggregatesFilter<"Task"> | boolean
    attempts?: IntWithAggregatesFilter<"Task"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type HintWhereInput = {
    AND?: HintWhereInput | HintWhereInput[]
    OR?: HintWhereInput[]
    NOT?: HintWhereInput | HintWhereInput[]
    id?: IntFilter<"Hint"> | number
    hint?: StringFilter<"Hint"> | string
    createdAt?: DateTimeFilter<"Hint"> | Date | string
    bullets?: Hint_BulletListRelationFilter
  }

  export type HintOrderByWithRelationInput = {
    id?: SortOrder
    hint?: SortOrder
    createdAt?: SortOrder
    bullets?: Hint_BulletOrderByRelationAggregateInput
  }

  export type HintWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HintWhereInput | HintWhereInput[]
    OR?: HintWhereInput[]
    NOT?: HintWhereInput | HintWhereInput[]
    hint?: StringFilter<"Hint"> | string
    createdAt?: DateTimeFilter<"Hint"> | Date | string
    bullets?: Hint_BulletListRelationFilter
  }, "id">

  export type HintOrderByWithAggregationInput = {
    id?: SortOrder
    hint?: SortOrder
    createdAt?: SortOrder
    _count?: HintCountOrderByAggregateInput
    _avg?: HintAvgOrderByAggregateInput
    _max?: HintMaxOrderByAggregateInput
    _min?: HintMinOrderByAggregateInput
    _sum?: HintSumOrderByAggregateInput
  }

  export type HintScalarWhereWithAggregatesInput = {
    AND?: HintScalarWhereWithAggregatesInput | HintScalarWhereWithAggregatesInput[]
    OR?: HintScalarWhereWithAggregatesInput[]
    NOT?: HintScalarWhereWithAggregatesInput | HintScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Hint"> | number
    hint?: StringWithAggregatesFilter<"Hint"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Hint"> | Date | string
  }

  export type Hint_BulletWhereInput = {
    AND?: Hint_BulletWhereInput | Hint_BulletWhereInput[]
    OR?: Hint_BulletWhereInput[]
    NOT?: Hint_BulletWhereInput | Hint_BulletWhereInput[]
    id?: IntFilter<"Hint_Bullet"> | number
    bullet?: StringFilter<"Hint_Bullet"> | string
    createdAt?: DateTimeFilter<"Hint_Bullet"> | Date | string
    hintId?: IntFilter<"Hint_Bullet"> | number
    Hint?: XOR<HintRelationFilter, HintWhereInput>
  }

  export type Hint_BulletOrderByWithRelationInput = {
    id?: SortOrder
    bullet?: SortOrder
    createdAt?: SortOrder
    hintId?: SortOrder
    Hint?: HintOrderByWithRelationInput
  }

  export type Hint_BulletWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: Hint_BulletWhereInput | Hint_BulletWhereInput[]
    OR?: Hint_BulletWhereInput[]
    NOT?: Hint_BulletWhereInput | Hint_BulletWhereInput[]
    bullet?: StringFilter<"Hint_Bullet"> | string
    createdAt?: DateTimeFilter<"Hint_Bullet"> | Date | string
    hintId?: IntFilter<"Hint_Bullet"> | number
    Hint?: XOR<HintRelationFilter, HintWhereInput>
  }, "id">

  export type Hint_BulletOrderByWithAggregationInput = {
    id?: SortOrder
    bullet?: SortOrder
    createdAt?: SortOrder
    hintId?: SortOrder
    _count?: Hint_BulletCountOrderByAggregateInput
    _avg?: Hint_BulletAvgOrderByAggregateInput
    _max?: Hint_BulletMaxOrderByAggregateInput
    _min?: Hint_BulletMinOrderByAggregateInput
    _sum?: Hint_BulletSumOrderByAggregateInput
  }

  export type Hint_BulletScalarWhereWithAggregatesInput = {
    AND?: Hint_BulletScalarWhereWithAggregatesInput | Hint_BulletScalarWhereWithAggregatesInput[]
    OR?: Hint_BulletScalarWhereWithAggregatesInput[]
    NOT?: Hint_BulletScalarWhereWithAggregatesInput | Hint_BulletScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Hint_Bullet"> | number
    bullet?: StringWithAggregatesFilter<"Hint_Bullet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Hint_Bullet"> | Date | string
    hintId?: IntWithAggregatesFilter<"Hint_Bullet"> | number
  }

  export type TaskCreateInput = {
    task: string
    answer: string
    comments: string
    difficulty?: number
    status?: string
    completed?: boolean
    attempts: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    task: string
    answer: string
    comments: string
    difficulty?: number
    status?: string
    completed?: boolean
    attempts: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateInput = {
    task?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    task?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: number
    task: string
    answer: string
    comments: string
    difficulty?: number
    status?: string
    completed?: boolean
    attempts: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    task?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    task?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HintCreateInput = {
    hint: string
    createdAt?: Date | string
    bullets?: Hint_BulletCreateNestedManyWithoutHintInput
  }

  export type HintUncheckedCreateInput = {
    id?: number
    hint: string
    createdAt?: Date | string
    bullets?: Hint_BulletUncheckedCreateNestedManyWithoutHintInput
  }

  export type HintUpdateInput = {
    hint?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bullets?: Hint_BulletUpdateManyWithoutHintNestedInput
  }

  export type HintUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hint?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bullets?: Hint_BulletUncheckedUpdateManyWithoutHintNestedInput
  }

  export type HintCreateManyInput = {
    id?: number
    hint: string
    createdAt?: Date | string
  }

  export type HintUpdateManyMutationInput = {
    hint?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HintUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hint?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Hint_BulletCreateInput = {
    bullet: string
    createdAt?: Date | string
    Hint: HintCreateNestedOneWithoutBulletsInput
  }

  export type Hint_BulletUncheckedCreateInput = {
    id?: number
    bullet: string
    createdAt?: Date | string
    hintId: number
  }

  export type Hint_BulletUpdateInput = {
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Hint?: HintUpdateOneRequiredWithoutBulletsNestedInput
  }

  export type Hint_BulletUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hintId?: IntFieldUpdateOperationsInput | number
  }

  export type Hint_BulletCreateManyInput = {
    id?: number
    bullet: string
    createdAt?: Date | string
    hintId: number
  }

  export type Hint_BulletUpdateManyMutationInput = {
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Hint_BulletUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hintId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    task?: SortOrder
    answer?: SortOrder
    comments?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    completed?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    difficulty?: SortOrder
    attempts?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    task?: SortOrder
    answer?: SortOrder
    comments?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    completed?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    task?: SortOrder
    answer?: SortOrder
    comments?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    completed?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    difficulty?: SortOrder
    attempts?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Hint_BulletListRelationFilter = {
    every?: Hint_BulletWhereInput
    some?: Hint_BulletWhereInput
    none?: Hint_BulletWhereInput
  }

  export type Hint_BulletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HintCountOrderByAggregateInput = {
    id?: SortOrder
    hint?: SortOrder
    createdAt?: SortOrder
  }

  export type HintAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HintMaxOrderByAggregateInput = {
    id?: SortOrder
    hint?: SortOrder
    createdAt?: SortOrder
  }

  export type HintMinOrderByAggregateInput = {
    id?: SortOrder
    hint?: SortOrder
    createdAt?: SortOrder
  }

  export type HintSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HintRelationFilter = {
    is?: HintWhereInput
    isNot?: HintWhereInput
  }

  export type Hint_BulletCountOrderByAggregateInput = {
    id?: SortOrder
    bullet?: SortOrder
    createdAt?: SortOrder
    hintId?: SortOrder
  }

  export type Hint_BulletAvgOrderByAggregateInput = {
    id?: SortOrder
    hintId?: SortOrder
  }

  export type Hint_BulletMaxOrderByAggregateInput = {
    id?: SortOrder
    bullet?: SortOrder
    createdAt?: SortOrder
    hintId?: SortOrder
  }

  export type Hint_BulletMinOrderByAggregateInput = {
    id?: SortOrder
    bullet?: SortOrder
    createdAt?: SortOrder
    hintId?: SortOrder
  }

  export type Hint_BulletSumOrderByAggregateInput = {
    id?: SortOrder
    hintId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type Hint_BulletCreateNestedManyWithoutHintInput = {
    create?: XOR<Hint_BulletCreateWithoutHintInput, Hint_BulletUncheckedCreateWithoutHintInput> | Hint_BulletCreateWithoutHintInput[] | Hint_BulletUncheckedCreateWithoutHintInput[]
    connectOrCreate?: Hint_BulletCreateOrConnectWithoutHintInput | Hint_BulletCreateOrConnectWithoutHintInput[]
    createMany?: Hint_BulletCreateManyHintInputEnvelope
    connect?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
  }

  export type Hint_BulletUncheckedCreateNestedManyWithoutHintInput = {
    create?: XOR<Hint_BulletCreateWithoutHintInput, Hint_BulletUncheckedCreateWithoutHintInput> | Hint_BulletCreateWithoutHintInput[] | Hint_BulletUncheckedCreateWithoutHintInput[]
    connectOrCreate?: Hint_BulletCreateOrConnectWithoutHintInput | Hint_BulletCreateOrConnectWithoutHintInput[]
    createMany?: Hint_BulletCreateManyHintInputEnvelope
    connect?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
  }

  export type Hint_BulletUpdateManyWithoutHintNestedInput = {
    create?: XOR<Hint_BulletCreateWithoutHintInput, Hint_BulletUncheckedCreateWithoutHintInput> | Hint_BulletCreateWithoutHintInput[] | Hint_BulletUncheckedCreateWithoutHintInput[]
    connectOrCreate?: Hint_BulletCreateOrConnectWithoutHintInput | Hint_BulletCreateOrConnectWithoutHintInput[]
    upsert?: Hint_BulletUpsertWithWhereUniqueWithoutHintInput | Hint_BulletUpsertWithWhereUniqueWithoutHintInput[]
    createMany?: Hint_BulletCreateManyHintInputEnvelope
    set?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    disconnect?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    delete?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    connect?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    update?: Hint_BulletUpdateWithWhereUniqueWithoutHintInput | Hint_BulletUpdateWithWhereUniqueWithoutHintInput[]
    updateMany?: Hint_BulletUpdateManyWithWhereWithoutHintInput | Hint_BulletUpdateManyWithWhereWithoutHintInput[]
    deleteMany?: Hint_BulletScalarWhereInput | Hint_BulletScalarWhereInput[]
  }

  export type Hint_BulletUncheckedUpdateManyWithoutHintNestedInput = {
    create?: XOR<Hint_BulletCreateWithoutHintInput, Hint_BulletUncheckedCreateWithoutHintInput> | Hint_BulletCreateWithoutHintInput[] | Hint_BulletUncheckedCreateWithoutHintInput[]
    connectOrCreate?: Hint_BulletCreateOrConnectWithoutHintInput | Hint_BulletCreateOrConnectWithoutHintInput[]
    upsert?: Hint_BulletUpsertWithWhereUniqueWithoutHintInput | Hint_BulletUpsertWithWhereUniqueWithoutHintInput[]
    createMany?: Hint_BulletCreateManyHintInputEnvelope
    set?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    disconnect?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    delete?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    connect?: Hint_BulletWhereUniqueInput | Hint_BulletWhereUniqueInput[]
    update?: Hint_BulletUpdateWithWhereUniqueWithoutHintInput | Hint_BulletUpdateWithWhereUniqueWithoutHintInput[]
    updateMany?: Hint_BulletUpdateManyWithWhereWithoutHintInput | Hint_BulletUpdateManyWithWhereWithoutHintInput[]
    deleteMany?: Hint_BulletScalarWhereInput | Hint_BulletScalarWhereInput[]
  }

  export type HintCreateNestedOneWithoutBulletsInput = {
    create?: XOR<HintCreateWithoutBulletsInput, HintUncheckedCreateWithoutBulletsInput>
    connectOrCreate?: HintCreateOrConnectWithoutBulletsInput
    connect?: HintWhereUniqueInput
  }

  export type HintUpdateOneRequiredWithoutBulletsNestedInput = {
    create?: XOR<HintCreateWithoutBulletsInput, HintUncheckedCreateWithoutBulletsInput>
    connectOrCreate?: HintCreateOrConnectWithoutBulletsInput
    upsert?: HintUpsertWithoutBulletsInput
    connect?: HintWhereUniqueInput
    update?: XOR<XOR<HintUpdateToOneWithWhereWithoutBulletsInput, HintUpdateWithoutBulletsInput>, HintUncheckedUpdateWithoutBulletsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Hint_BulletCreateWithoutHintInput = {
    bullet: string
    createdAt?: Date | string
  }

  export type Hint_BulletUncheckedCreateWithoutHintInput = {
    id?: number
    bullet: string
    createdAt?: Date | string
  }

  export type Hint_BulletCreateOrConnectWithoutHintInput = {
    where: Hint_BulletWhereUniqueInput
    create: XOR<Hint_BulletCreateWithoutHintInput, Hint_BulletUncheckedCreateWithoutHintInput>
  }

  export type Hint_BulletCreateManyHintInputEnvelope = {
    data: Hint_BulletCreateManyHintInput | Hint_BulletCreateManyHintInput[]
    skipDuplicates?: boolean
  }

  export type Hint_BulletUpsertWithWhereUniqueWithoutHintInput = {
    where: Hint_BulletWhereUniqueInput
    update: XOR<Hint_BulletUpdateWithoutHintInput, Hint_BulletUncheckedUpdateWithoutHintInput>
    create: XOR<Hint_BulletCreateWithoutHintInput, Hint_BulletUncheckedCreateWithoutHintInput>
  }

  export type Hint_BulletUpdateWithWhereUniqueWithoutHintInput = {
    where: Hint_BulletWhereUniqueInput
    data: XOR<Hint_BulletUpdateWithoutHintInput, Hint_BulletUncheckedUpdateWithoutHintInput>
  }

  export type Hint_BulletUpdateManyWithWhereWithoutHintInput = {
    where: Hint_BulletScalarWhereInput
    data: XOR<Hint_BulletUpdateManyMutationInput, Hint_BulletUncheckedUpdateManyWithoutHintInput>
  }

  export type Hint_BulletScalarWhereInput = {
    AND?: Hint_BulletScalarWhereInput | Hint_BulletScalarWhereInput[]
    OR?: Hint_BulletScalarWhereInput[]
    NOT?: Hint_BulletScalarWhereInput | Hint_BulletScalarWhereInput[]
    id?: IntFilter<"Hint_Bullet"> | number
    bullet?: StringFilter<"Hint_Bullet"> | string
    createdAt?: DateTimeFilter<"Hint_Bullet"> | Date | string
    hintId?: IntFilter<"Hint_Bullet"> | number
  }

  export type HintCreateWithoutBulletsInput = {
    hint: string
    createdAt?: Date | string
  }

  export type HintUncheckedCreateWithoutBulletsInput = {
    id?: number
    hint: string
    createdAt?: Date | string
  }

  export type HintCreateOrConnectWithoutBulletsInput = {
    where: HintWhereUniqueInput
    create: XOR<HintCreateWithoutBulletsInput, HintUncheckedCreateWithoutBulletsInput>
  }

  export type HintUpsertWithoutBulletsInput = {
    update: XOR<HintUpdateWithoutBulletsInput, HintUncheckedUpdateWithoutBulletsInput>
    create: XOR<HintCreateWithoutBulletsInput, HintUncheckedCreateWithoutBulletsInput>
    where?: HintWhereInput
  }

  export type HintUpdateToOneWithWhereWithoutBulletsInput = {
    where?: HintWhereInput
    data: XOR<HintUpdateWithoutBulletsInput, HintUncheckedUpdateWithoutBulletsInput>
  }

  export type HintUpdateWithoutBulletsInput = {
    hint?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HintUncheckedUpdateWithoutBulletsInput = {
    id?: IntFieldUpdateOperationsInput | number
    hint?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Hint_BulletCreateManyHintInput = {
    id?: number
    bullet: string
    createdAt?: Date | string
  }

  export type Hint_BulletUpdateWithoutHintInput = {
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Hint_BulletUncheckedUpdateWithoutHintInput = {
    id?: IntFieldUpdateOperationsInput | number
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Hint_BulletUncheckedUpdateManyWithoutHintInput = {
    id?: IntFieldUpdateOperationsInput | number
    bullet?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use HintCountOutputTypeDefaultArgs instead
     */
    export type HintCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HintCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskDefaultArgs instead
     */
    export type TaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HintDefaultArgs instead
     */
    export type HintArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HintDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Hint_BulletDefaultArgs instead
     */
    export type Hint_BulletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Hint_BulletDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}