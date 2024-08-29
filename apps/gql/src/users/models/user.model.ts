import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Int)
  status: number;
}
// @ObjectType({ description: 'user' })
// export class User {
//   @Field((type) => ID)
//   id: string;

//   @Directive('@upper')
//   name: string;

//   //   @Field({ nullable: true })
//   //   description?: string;

//   //   @Field()
//   //   creationDate: Date;

//   //   @Field(type => [String])
//   //   ingredients: string[];
// }
