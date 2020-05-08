import request from 'supertest'
import app from '../config/app'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'

describe('Operation route', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  test('should return an operation CREDIT on success', async () => {
    await request(app)
      .post('/api/operation')
      .send({
        type: 'CREDIT',
        amount: 1,
        date: new Date(),
        description: 'any_description'
      })
      .expect(200)
  })

  test('should return an operation DEBIT on success', async () => {
    await request(app)
      .post('/api/operation')
      .send({
        type: 'DEBIT',
        amount: 1,
        date: new Date(),
        description: 'any_description'
      })
      .expect(200)
  })
})
