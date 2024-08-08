export interface UserModel{
  firstname: string;
  lastname: string;
  phone:string;
  city: string;
  email: string;
  role: string;
}

export const defaultUserModel: UserModel = {
  firstname: '',
  lastname: '',
  phone:'',
  city:'',
  email: '',
  role: '',
};
