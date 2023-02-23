declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: string;
        DATABASE_URL?: string;
        CONNPASS_API_ENDPOINT?: string;
      }
    }
  }
}
