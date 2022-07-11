import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Netflix, Prisma } from '@prisma/client';

@Injectable()
export class NetflixService {
  constructor(private prisma: PrismaService) {}

  async netflix(
    netflixWhereUniqueInput: Prisma.NetflixWhereUniqueInput,
  ): Promise<Netflix | null> {
    return this.prisma.netflix.findUnique({
      where: netflixWhereUniqueInput,
    });
  }

  async netflixs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NetflixWhereUniqueInput;
    where?: Prisma.NetflixWhereInput;
    orderBy?: Prisma.NetflixOrderByWithRelationInput;
  }): Promise<Netflix[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.netflix.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createNetflix(data: Prisma.NetflixCreateInput): Promise<Netflix> {
    return this.prisma.netflix.create({
      data,
    });
  }

  async updateNetflix(params: {
    where: Prisma.NetflixWhereUniqueInput;
    data: Prisma.NetflixUpdateInput;
  }): Promise<Netflix> {
    const { where, data } = params;
    return this.prisma.netflix.update({
      data,
      where,
    });
  }

  async deleteNetflix(where: Prisma.NetflixWhereUniqueInput): Promise<Netflix> {
    return this.prisma.netflix.delete({
      where,
    });
  }
}
