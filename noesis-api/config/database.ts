import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },

      /** Pool Settings */
      pool: {
        min: 2,            // never drop below 2 idle connections
        max: 10,           // no more than 10 simulataneous connections
        idleTimeoutMillis: 30_000,  // (default: 10s) - disconnect if idle for 30 seconds
        acquireTimeoutMillis: 60_000, // fail fast if poool is exhausted
      },
    },
  },
})

export default dbConfig