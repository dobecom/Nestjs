import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength, IsEmail } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @MaxLength(255)
  email?: string;
}
