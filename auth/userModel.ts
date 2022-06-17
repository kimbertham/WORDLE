import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt' 

export interface IUser {
    _id?:string;
    username:string;
    password: string,
    validatePassword : (password: string) => boolean
}

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, required: true }
})

userSchema.methods.validatePassword = function(password : string) {
  return bcrypt.compareSync(password, this.password)
}


userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})


export const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema)


