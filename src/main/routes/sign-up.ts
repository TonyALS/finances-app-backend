import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapters'
import { makeSignUpController } from '../factories/sign-up'

export default (router: Router): void => {
  router.post('/api/signup', adaptRoute(makeSignUpController()))
}
