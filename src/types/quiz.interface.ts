export interface IOption {
  id: string;
  text: string;
}

export interface IQuestion {
  id: string;
  text: string;
  options: IOption[];
}

export interface IQuiz {
  id: string;
  topic: string;
  isPublic: boolean;
  creatorId: string;
  questions: IQuestion[];
}
