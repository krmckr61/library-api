import { Module } from '@nestjs/common';
import { BookTypeService } from './service/book-type.service';

@Module({
  providers: [BookTypeService],
  exports: [BookTypeService],
})
export class BookTypeModule {}
