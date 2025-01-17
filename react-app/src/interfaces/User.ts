export interface IUserInput {
  name: string,
  zipCode: string
}

export default interface IUser extends IUserInput {
  id: string|null,
}
