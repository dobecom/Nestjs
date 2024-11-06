import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { description: 'Current page', nullable: true })
  @IsOptional()
  @Min(1, { message: 'Page value must be at least 1.' })
  page?: number;

  @Field(() => Int, { description: 'Page limit', nullable: true })
  @IsOptional()
  @Min(1, { message: 'Limit value must be at least 1.' })
  limit?: number;
}
