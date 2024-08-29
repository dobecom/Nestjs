import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length, MaxLength, Min } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  @Min(1)
  id: number; // 업데이트할 사용자 ID는 필수

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  name?: string; // 선택적 필드, 이름 업데이트

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string; // 선택적 필드, 이메일 업데이트
}
