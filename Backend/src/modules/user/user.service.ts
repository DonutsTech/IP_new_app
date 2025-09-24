import prismaClient from '../../prisma';
import * as bycrpt from 'bcryptjs';
import { Prisma, User } from '@prisma/client';
import { updateUserDTO } from './interfaces/updateUser.dto';
import { AppError } from '../../erros';

class UserService {
  async create(data: Prisma.UserCreateInput) {
    try {
      data.HASHED_PASSWORD = await bycrpt.hash(data.HASHED_PASSWORD, await bycrpt.genSalt());

      return await prismaClient.user.create({
        data,
      });
    } catch (error) {
      throw new AppError('Erro ao criar usuário', 500);
    }
  }

  async update(id: string, data: updateUserDTO): Promise<User> {
    try {
      await this.existsID(id);

      const salt = await bycrpt.genSalt();

      if (data.HASHED_PASSWORD) {
        data.HASHED_PASSWORD = await bycrpt.hash(data.HASHED_PASSWORD, salt);
      }

      if (data.HASHED_TOKEN) {
        data.HASHED_TOKEN = await bycrpt.hash(data.HASHED_TOKEN, salt);
      }

      return await prismaClient.user.update({
        where: {
          ID: id,
        },
        data: data as any,
        include: { PLAN: true, HISTORY_PLAYS: true, VIDEOS: true, CAMPAIGNS: true },
      });
    } catch (error) {
      throw new AppError('Erro ao atualizar usuário', 500);
    }
  }

  async delet(id: string): Promise<User> {
    try {
      await this.existsID(id);

      return await prismaClient.user.delete({
        where: { ID: id },
      });
    } catch (error) {
      throw new AppError('Erro ao deletar usuário', 500);
    }
  }

  async users(params?: Prisma.UserFindManyArgs): Promise<User[]> {
    return await prismaClient.user.findMany(params);
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: userWhereUniqueInput,
      include: { PLAN: true, HISTORY_PLAYS: true, VIDEOS: true, CAMPAIGNS: true },
    });
  }

  async showId(id: string) {
    try {
      await this.existsID(id);

      return await this.user({ ID: id });
    } catch (error) {
      throw error;
    }
  }

  async showEmail(email: string): Promise<User | null> {
    try {
      await this.existsEmail(email);

      return this.user({ EMAIL: email });
    } catch (error) {
      throw error;
    }
  }

  async countUser(where: { ID?: string; EMAIL?: string }): Promise<number> {
    try {
      return await prismaClient.user.count({ where });
    } catch (error) {
      throw new AppError('Erro ao contar usuários', 500);
    }
  }

  async existsID(id: string) {
    if (!(await this.countUser({ ID: id }))) {
      throw new AppError('Usuario não encontrado, por favor verifique o seu id', 404);
    }
  }

  async existsEmail(email: string) {
    if (!(await this.countUser({ EMAIL: email }))) {
      throw new AppError('Usuario não encontrado, por favor verifique o seu  email', 404);
    }
  }
}

export const userService = new UserService();
