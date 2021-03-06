module.exports = [
  {
    name: 'production',
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || '05481202',
    database: process.env.TYPEORM_DATABASE || 'finances-prod',
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [
      'dist/src/infra/db/postgres/entities/**/*.js'
    ],
    migrations: [
      'dist/src/migration/**/*.js'
    ],
    subscribers: [
      'dist/src/subscriber/**/*.js'
    ],
    cli: {
      entitiesDir: 'dist/src/infra/db/postgres/entities',
      migrationsDir: 'dist/src/migration',
      subscribersDir: 'dist/src/subscriber'
    }
  },
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '05481202',
    database: 'finances-dev',
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [
      'src/infra/db/postgres/entities/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/infra/db/postgres/entities/**/*.ts',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  },
  {
    name: 'tests',
    type: 'sqlite',
    database: './tests.sqlite',
    synchronize: true,
    logging: false,
    entities: [
      'src/infra/db/postgres/entities/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/infra/db/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  }
]
