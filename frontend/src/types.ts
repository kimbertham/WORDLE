export interface IUser {
  _id? :string;
  username: string;
  passwaord?: string;
}

export interface IFriend  {
  rounds?: IGame[],
  users: IUser[]
  _id : string;
  currentRound? : IGame
}

export interface IGame {
  _id?:string;
  friendship:IFriend;
  winner?:IUser;
  request: boolean;
  players: IPlayer[]
}

export interface IPlayer {
  _id?:string;
  user: IUser;
  word: string;
  guesses: string[];
completed: boolean
}

export interface ITotal {
  _id: string
  score: number;
}