import { Bond_Video, Prisma } from '@prisma/client';
import prisma from '../../prisma';
import { AppError } from '../../erros';

class BondVideoService {
  async create(data: Prisma.Bond_VideoCreateInput): Promise<Bond_Video> {
    try {
      const bondVideo = await prisma.bond_Video.create({
        data,
      });
      return bondVideo;
    } catch (error) {
      throw new AppError('Erro ao criar vínculo de vídeo', 500);
    }
  }
}

export const bondVideoService = new BondVideoService();
