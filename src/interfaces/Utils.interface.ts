export type Nullish<T> = T | null;

export type ObjectLike<T> = {
  [key: string]: T;
};

export enum IUnknownValues {
  Unknown = 'unknown',
  NotAvailable = 'n/a',
}
