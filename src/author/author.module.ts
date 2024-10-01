import { Module } from '@nestjs/common';
import { AuthorService } from './service/author.service';

@Module({
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
