import { PrismaService } from '@app/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(id: string): Promise<Author> {
    return this.prismaService.author
      .findFirstOrThrow({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('Author not found');
      });
  }
}
