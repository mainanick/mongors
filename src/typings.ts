type dbpathFn = (...args: any[]) => string;

export interface mongoRsOptions {
  keep?: boolean;
  port?: number;
  fork?: boolean;
}
