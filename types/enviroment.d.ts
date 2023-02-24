declare namespace NodeJS {
  export interface ProcessEnv {
    readonly JWT_SECRET: string
    readonly NEXT_AUTH_SECRET: string

    readonly DATABASE_URL: string
  }
}
