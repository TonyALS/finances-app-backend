import { AccountModel } from '../../models/account/account-model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  addAccount (accountData: AddAccountModel): Promise<AccountModel>
}
