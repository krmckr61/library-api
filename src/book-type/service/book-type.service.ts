import { PrismaService } from '@app/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookType } from '@prisma/client';

@Injectable()
export class BookTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(id: string): Promise<BookType> {
    return this.prismaService.bookType
      .findFirstOrThrow({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('Book type not found');
      });
  }
}
