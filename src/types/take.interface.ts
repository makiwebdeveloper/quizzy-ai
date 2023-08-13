import { IAnswer } from "./answer.interface";
import { IUser } from "./user.interface";

export interface ITake {
  startsAt: Date;
  endsAt: Date | null;
  quizId: string;
  playerId: string;
}

export interface IFullTake {
  startsAt: Date;
  endsAt: Date | null;
  player: IUser;
  quizId: string;
  answers: IAnswer[];
}
