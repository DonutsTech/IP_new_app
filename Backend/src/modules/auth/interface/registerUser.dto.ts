import { LoginUserDTO } from './loginUser.dto';

export interface RegisterUserDTO extends LoginUserDTO {
  NAME: string;
  PHONE: string;
}
