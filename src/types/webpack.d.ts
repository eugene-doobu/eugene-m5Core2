interface WebpackRequireContext {
  keys(): string[];
  (id: string): unknown;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Require {
      context(
        directory: string,
        useSubdirectories?: boolean,
        regExp?: RegExp
      ): WebpackRequireContext;
    }
  }
}

export {};
