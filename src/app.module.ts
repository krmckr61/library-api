import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { PrismaModule } from '@app/prisma';
import { AuthorModule } from './author/author.module';
import { BookTypeModule } from './book-type/book-type.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    AuthorModule,
    BookTypeModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
