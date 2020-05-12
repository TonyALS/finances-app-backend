import { DbFinancialReportsOperation } from './db-financial-reports'
import { SumAllOperationRepository } from '../usecases/sum-operations-by-type-repository'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumModel } from '../../../domain/models/sum-model'
import { FinancialResultRepository } from '../usecases/financial-result-repository'
import { FinancialResultModel } from '../../../domain/models/financial-result-model'

interface SutTypes {
  sut: DbFinancialReportsOperation
  financialResultRepositoryStub: FinancialResultRepository
  sumAllOpRepositoryStub: SumAllOperationRepository
}

const makeSumAllOperationRepository = (): SumAllOperationRepository => {
  class SumAllOperationRepositoryStub implements SumAllOperationRepository {
    async sumAllOperationRepository (operationType: OperationType): Promise<SumModel> {
      return new Promise(resolve => resolve({
        operation: [
          {
            id: 1,
            type: operationType,
            description: 'any_description',
            amount: 2
          }
        ],
        sum: 2
      }))
    }
  }
  return new SumAllOperationRepositoryStub()
}

const makeFinancialResultRepository = (): FinancialResultRepository => {
  class FinancialResultRepositoryStub implements FinancialResultRepository {
    async financialResultRepository (): Promise<FinancialResultModel> {
      return new Promise(resolve => resolve({
        sumDebits: 25,
        sumCredits: 50,
        result: 25
      }))
    }
  }
  return new FinancialResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const sumAllOpRepositoryStub = makeSumAllOperationRepository()
  const financialResultRepositoryStub = makeFinancialResultRepository()
  const sut = new DbFinancialReportsOperation(sumAllOpRepositoryStub, financialResultRepositoryStub)
  return {
    sut,
    sumAllOpRepositoryStub,
    financialResultRepositoryStub
  }
}

describe('DbFinancialReports', () => {
  describe('Sum operations', () => {
    test('should call sumAllOpRepository with correct value if DEBIT', async () => {
      const { sut, sumAllOpRepositoryStub } = makeSut()
      const sumSpy = jest.spyOn(sumAllOpRepositoryStub, 'sumAllOperationRepository')
      await sut.sumAllOperation(OperationType.DEBIT)
      expect(sumSpy).toHaveBeenCalledWith('DEBIT')
    })

    test('should call sumAllOpRepository with correct value if CREDIT', async () => {
      const { sut, sumAllOpRepositoryStub } = makeSut()
      const sumSpy = jest.spyOn(sumAllOpRepositoryStub, 'sumAllOperationRepository')
      await sut.sumAllOperation(OperationType.CREDIT)
      expect(sumSpy).toHaveBeenCalledWith('CREDIT')
    })

    test('should sumAllOpRepository returns DEBIT operations on success', async () => {
      const { sut } = makeSut()
      const debitOperation = await sut.sumAllOperation(OperationType.DEBIT)
      expect(debitOperation).toEqual({
        operation: [
          {
            id: 1,
            type: OperationType.DEBIT,
            description: 'any_description',
            amount: 2
          }
        ],
        sum: 2
      })
    })

    test('should sumAllOpRepository returns CREDIT operations on success', async () => {
      const { sut } = makeSut()
      const creditOperation = await sut.sumAllOperation(OperationType.CREDIT)
      expect(creditOperation).toEqual({
        operation: [
          {
            id: 1,
            type: OperationType.CREDIT,
            description: 'any_description',
            amount: 2
          }
        ],
        sum: 2
      })
    })
  })
  describe('Financial Results operations', () => {
    test('should call financialResult', async () => {
      const { sut, financialResultRepositoryStub } = makeSut()
      const financialResultSpy = jest.spyOn(financialResultRepositoryStub, 'financialResultRepository')
      await sut.financialResult()
      expect(financialResultSpy).toHaveBeenCalled()
    })

    test('should financialResult returns financial result', async () => {
      const { sut } = makeSut()
      const financialResult = await sut.financialResult()
      expect(financialResult).toEqual({
        sumDebits: 25,
        sumCredits: 50,
        result: 25
      })
    })
  })
})
