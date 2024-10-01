import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';
import { BookTypeModule } from 'src/book-type/book-type.module';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [forwardRef(() => BookTypeModule), forwardRef(() => AuthorModule)],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
