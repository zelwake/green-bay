declare namespace NodeJS {
  export interface ProcessEnv {
    readonly JWT_SECRET: string
    readonly NEXT_AUTH_SECRET: string

    readonly MYSQL_HOST: string
    readonly MYSQL_USER: string
    readonly MYSQL_PASSWORD: string
    readonly MYSQL_DATABASE: string
  }
}
