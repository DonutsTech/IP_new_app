import { RegisterUserDTO } from '../../auth/interface/registerUser.dto';

export interface createUserDTO extends RegisterUserDTO {
  AVATAR?: string;
  HASHED_TOKEN?: string;
  FIRST_ACESS?: boolean;
  VALIDATION_EMAIL?: boolean;
  ROLE?: string;
  ACTIVE?: Boolean;
  STRIPE_CUSTOMER_ID?: string;
  STRIPE_SUBSCRIPTON_ID?: string;
  STRIPE_SUBSCRIPTON_STATUS?: string;
  PLAN_ID?: string;
}
