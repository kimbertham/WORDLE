/* eslint-disable @typescript-eslint/no-var-requires */
import { IUser } from './userModel'
import { Request } from  'express'

export interface ICustomReq extends Request {
	currentUser: IUser;
}