import { Prisma } from '@prisma/client';
import prismaClient from '../../prisma';
import { AppError } from '../../erros';
import { HistoryPlaysCreate } from './interface/historyPlaysCreate.dto';
import { HistoryPlaysUpdate } from './interface/historyPlaysUpdate.dto';

class HistoryPlaysService {
  async create(data: HistoryPlaysCreate) {
    try {
      return await prismaClient.history_Plays.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: HistoryPlaysUpdate) {
    await this.existID(id);

    return await prismaClient.history_Plays.update({
      where: {
        ID: id,
      },
      data,
    });
  }

  async delet() {}

  async historyPlays(params: Prisma.History_PlaysFindManyArgs) {
    return await prismaClient.history_Plays.findMany(params);
  }

  async historyPlay(historyPlayWhereUniqueInput: Prisma.History_PlaysWhereUniqueInput) {
    return await prismaClient.history_Plays.findUnique({ where: historyPlayWhereUniqueInput });
  }

  async showId(id: string) {
    await this.existID(id);

    return this.historyPlay({ ID: id });
  }

  async countHistoryPlay(where: { ID: string }) {
    return await prismaClient.history_Plays.count({ where });
  }

  async existID(id: string) {
    if (!(await this.countHistoryPlay({ ID: id }))) {
      throw new AppError('');
    }
  }

  async count(): Promise<Number> {
    return await prismaClient.history_Plays.count();
  }
}

export const historyPlaysService = new HistoryPlaysService();
