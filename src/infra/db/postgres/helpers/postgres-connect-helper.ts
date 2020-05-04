import { getConnectionOptions, createConnection } from 'typeorm'

export const CreateConnectionPostgres = {
  async connect (): Promise<any> {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    return await createConnection({ ...connectionOptions, name: 'default' })
  }
}
