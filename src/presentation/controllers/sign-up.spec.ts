import { SignUpController } from './sign-up'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param'
import { InvalidParamError } from '../errors/invalid-param'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUpController', () => {
  test('should return 400 if no name is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should return 400 if no passwordConfirmation is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  test('should return 400 if no password and passwordConfirmation not match', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'other_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })
})