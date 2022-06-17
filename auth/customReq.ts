import { IUser } from './userModel'
import { Request } from 'express'

export interface ICustomReq extends Request {
	currentUser: IUser;
}