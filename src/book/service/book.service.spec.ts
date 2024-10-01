import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '@app/prisma';
import { BookTypeService } from '../../book-type/service/book-type.service';
import { AuthorService } from '../../author/service/author.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, PrismaService, BookTypeService, AuthorService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should return right book"', async () => {
    const book = await service.findFirst('1');
    expect(book.id).toBe('1');
  });
});
