import { PaginateQueryDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum BookOrderByEnum {
  name = 'name',
  scoreCount = 'scoreCount',
  averageScore = 'averageScore',
  publishYear = 'publishYear',
}

export class BookQueryDto extends PaginateQueryDto {
  @ApiProperty({
    enum: BookOrderByEnum,
  })
  @IsEnum(BookOrderByEnum)
  orderBy: BookOrderByEnum;
}
