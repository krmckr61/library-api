import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BookService } from '../service/book.service';
import { BookQueryDto } from '../dto/book.query.dto';
import { BookDto } from '../dto/book.dto';
import { Book } from '@prisma/client';
import { BookScoreDto } from '../dto/book-score.dto';

@Controller()
@ApiTags('book')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get()
  async findMany(@Query() queryDto: BookQueryDto) {
    return this.service.findMany(queryDto);
  }

  @Get(':bookId')
  async findFirst(@Param('bookId') bookId: string): Promise<Book> {
    return this.service.findFirst(bookId);
  }

  @Post()
  @ApiBody({
    type: BookDto,
  })
  async create(@Body() dto: BookDto): Promise<Book> {
    return this.service.create(dto);
  }

  @Post(':bookId/score')
  @ApiBody({
    type: BookScoreDto,
  })
  async score(
    @Param('bookId') bookId: string,
    @Body() dto: BookScoreDto,
  ): Promise<Book> {
    return this.service.score(bookId, dto);
  }

  @Put(':bookId')
  @ApiBody({
    type: BookDto,
  })
  async update(
    @Param('bookId') bookId: string,
    @Body() dto: BookDto,
  ): Promise<Book> {
    return this.service.update(bookId, dto);
  }

  @Delete(':bookId')
  async delete(@Param('bookId') bookId: string): Promise<void> {
    this.service.delete(bookId);
  }
}
