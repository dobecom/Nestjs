import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length, MaxLength, Min } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  @Min(1)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
