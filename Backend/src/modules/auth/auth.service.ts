import { User } from '@prisma/client';
import { RegisterUserDTO } from './interface/registerUser.dto';
import { userService } from '../user/user.service';
import { createStripeCustomer } from '../../utils/stripe';
import { AppError } from '../../erros';
import { LoginUserDTO } from './interface/loginUser.dto';
import * as bycrpt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { checkoutService } from '../checkout/checkout.service';
import { Payload } from '../../@types/payload';
import { mailService } from '../mail/mail.service';
import { ResetPasswordDTO } from './interface/resetPassword.dto';

class AuthService {
  createToken(user: User) {
    return sign(
      {
        NAME: user.NAME,
        EMAIL: user.EMAIL,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.ID,
        expiresIn: '7d',
      },
    );
  }

  checkToken(token: string) {
    try {
      const payload = verify(token, process.env.JWT_SECRET as string) as Payload;

      return payload;
    } catch (error) {
      throw new AppError('Token inválido', 401);
    }
  }

  generateRandom4DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 10000);

    return randomNumber.toString().padStart(4, '0');
  }

  async register(data: RegisterUserDTO) {
    try {
      const user = await userService.user({ EMAIL: data.EMAIL });

      if (user) {
        throw new AppError(
          'Parece que você já possui uma conta. Por favor, acesse usando seu login.',
          409,
        );
      }

      const stripe = await createStripeCustomer({
        email: data.EMAIL,
        name: data.NAME,
      });

      const create = await userService.create({ ...data, ...stripe });

      if (!(create.STRIPE_SUBSCRIPTON_STATUS === '')) {
        throw new AppError(
          'Parece que você já possui uma conta ativa. Por favor, acesse usando seu login.',
          409,
        );
      }

      return create;
    } catch (error) {
      throw error;
    }
  }

  async login({ EMAIL, HASHED_PASSWORD }: LoginUserDTO) {
    try {
      let user = await userService.showEmail(EMAIL);

      if (!user) {
        throw new AppError('E-mail ou senha incorreta, por favor tente novamente', 500);
      }

      if (!(await bycrpt.compare(HASHED_PASSWORD, user.HASHED_PASSWORD))) {
        throw new AppError('E-mail ou senha incorreta, por favor tente novamente', 500);
      }

      const portal = await checkoutService.createPortal(user.ID);

      if (user.ACTIVE) {
        const token = this.createToken(user);

        user = await userService.update(user.ID, { HASHED_TOKEN: token });

        return { ACCESSTOKEN: token, USER: user, PORTAL: portal };
      }

      return { ACCESSTOKEN: '', USER: user, PORTAL: portal };
    } catch (error) {
      throw error;
    }
  }

  async me(id: string) {
    try {
      const user = await userService.user({ ID: id });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const portal = await checkoutService.createPortal(user.ID);

      return { USER: user, PORTAL: portal };
    } catch (error) {
      throw error;
    }
  }

  async validateEmail(id: string) {
    try {
      let user = await userService.showId(id);

      if (!user) {
        throw new AppError('Token inválido', 401);
      }

      user = await userService.update(user.ID, { VALIDATION_EMAIL: true });

      return { USER: user };
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await userService.showEmail(email);

      if (!user) {
        throw new AppError('E-mail não encontrado, por favor tente novamente', 404);
      }

      const token = this.createToken(user);

      const randomNumber = this.generateRandom4DigitNumber();

      await userService.update(user.ID, { HASHED_TOKEN: randomNumber });

      await mailService.sendForgetPasswordEmail(user.EMAIL, token, randomNumber);

      return { MESSAGE: 'Email enviado com sucesso', TOKEN: token };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword({ ID, HASHED_PASSWORD, CODE }: ResetPasswordDTO) {
    try {
      const user = await userService.showId(ID);

      if (!user) {
        throw new AppError('Token inválido', 401);
      }

      if (user.HASHED_TOKEN && !(await bycrpt.compare(CODE, user.HASHED_TOKEN))) {
        throw new AppError('Código de verificação inválido', 401);
      }

      await userService.update(user.ID, {
        HASHED_PASSWORD,
        HASHED_TOKEN: '',
      });

      await mailService.sendResetPasswordEmail(user.EMAIL);

      return { MESSAGE: 'Senha alterada com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
