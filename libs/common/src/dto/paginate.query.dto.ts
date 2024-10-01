import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

enum OrderByDirectionEnum {
  asc = 'asc',
  desc = 'desc',
}

export class PaginateQueryDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Max(20)
  take: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  skip: number;

  @ApiProperty({
    enum: OrderByDirectionEnum,
  })
  @IsEnum(OrderByDirectionEnum)
  orderByDirection: OrderByDirectionEnum;
}
