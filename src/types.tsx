export interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  image?: string;
}

export interface IReward {
  id: number;
  from: IUser;
  to: IUser;
  reward: number;
  datetime: string;
  message: string;
}

export interface IRewardForm {
  from: IUser;
  to: IUser | null;
  reward: number;
  message: string;
}
