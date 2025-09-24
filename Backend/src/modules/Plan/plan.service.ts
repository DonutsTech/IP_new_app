import { Plan, Prisma } from '@prisma/client';
import prismaClient from '../../prisma';
import { AppError } from '../../erros';

class PlanService {
  async create(data: Prisma.PlanCreateInput): Promise<Plan> {
    try {
      return await prismaClient.plan.create({ data });
    } catch (error) {
      throw new AppError('');
    }
  }

  async update() {}

  async delet() {}

  async plans(params: Prisma.PlanFindManyArgs): Promise<Plan[]> {
    return await prismaClient.plan.findMany(params);
  }

  async plan(planWhereUniqueInput: Prisma.PlanWhereUniqueInput) {
    return await prismaClient.plan.findUnique({ where: planWhereUniqueInput });
  }

  async showId(id: string) {
    await this.existsID(id);

    return this.plan({ ID: id });
  }

  async countPlan(where: { ID: string }) {
    return await prismaClient.plan.count({ where });
  }

  async existsID(id: string) {
    if (!(await this.countPlan({ ID: id }))) {
      throw new AppError('');
    }
  }

  async count(): Promise<Number> {
    return await prismaClient.plan.count();
  }
}

export const planService = new PlanService();
