import { PaginateResponseDto } from '@app/common';
import { PrismaService } from '@app/prisma';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { BookQueryDto } from '../dto/book.query.dto';
import { BookDto } from '../dto/book.dto';
import { BookScoreDto } from '../dto/book-score.dto';
import { BookTypeService } from '../../book-type/service/book-type.service';
import { AuthorService } from '../../author/service/author.service';

@Injectable()
export class BookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookTypeService: BookTypeService,
    private readonly authorService: AuthorService,
  ) {}

  async findMany(queryDto: BookQueryDto): Promise<PaginateResponseDto> {
    // map order by process
    const orderBy: Prisma.BookOrderByWithRelationInput = {};
    orderBy[queryDto.orderBy] = queryDto.orderByDirection;

    // find data and total data count for pagination
    const [data, totalCount] = await Promise.all([
      this.prismaService.book.findMany({
        select: {
          id: true,
          name: true,
          publishYear: true,
          type: true,
          author: true,
          averageScore: true,
          scoreCount: true,
        },
        take: queryDto.take,
        skip: queryDto.skip,
        orderBy,
      }),
      this.prismaService.book.count(),
    ]);

    return { data, totalCount };
  }

  async create(dto: BookDto): Promise<Book> {
    let createdBook: Book;

    // validate relational data
    await this.bookTypeService.findFirst(dto.typeId);
    await this.authorService.findFirst(dto.authorId);

    try {
      createdBook = await this.prismaService.book.create({
        data: dto,
      });
    } catch (e) {
      // log exception
      throw new InternalServerErrorException('Book could not created');
    }

    return this.findFirst(createdBook.id);
  }

  async update(id: string, dto: BookDto): Promise<Book> {
    // validate relational data
    await this.bookTypeService.findFirst(dto.typeId);
    await this.authorService.findFirst(dto.authorId);

    // find book if exist
    await this.findFirst(id);

    try {
      await this.prismaService.book.update({
        data: dto,
        where: {
          id,
        },
      });

      return this.findFirst(id);
    } catch (e) {
      // log exception
      throw new InternalServerErrorException('Book could not updated');
    }
  }

  async findFirst(id: string): Promise<Book> {
    // return first book if exist
    return this.prismaService.book
      .findFirstOrThrow({
        where: { id },
        include: {
          author: true,
          type: true,
        },
      })
      .catch(() => {
        // log exception
        throw new NotFoundException('Book not found');
      });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.book.delete({
      where: {
        id,
      },
    });
  }

  async score(id: string, dto: BookScoreDto): Promise<Book> {
    const book = await this.findFirst(id);
    let totalScore = 0;

    try {
      if (!book.scoreCount) {
        book.scoreCount = 0;
        book.averageScore = 0;
      }

      totalScore = book.scoreCount * book.averageScore + dto.score;

      book.scoreCount++;
      book.averageScore = parseFloat((totalScore / book.scoreCount).toFixed(2));
      await this.prismaService.book.update({
        data: {
          scoreCount: book.scoreCount,
          averageScore: book.averageScore,
        },
        where: { id },
      });

      return book;
    } catch (e) {
      //log exception
      throw new InternalServerErrorException('Could not score to the book');
    }
  }
}
