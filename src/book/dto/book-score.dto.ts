import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class BookScoreDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  score: number;
}
