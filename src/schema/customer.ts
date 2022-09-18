import { Field, InputType, ObjectType } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
export class Customer {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  hash_pwd: string;
}

@InputType()
export class CreateCustomerInput implements Partial<Customer> {
  @Field()
  @Length(2, 50)
  name: string;

  @Field()
  @Length(2, 50)
  email: string;

  @Field()
  phone: string;

  @Field()
  @Length(2, 15)
  hash_pwd: string;
}

@InputType()
export class UpdateCustomerInput implements Partial<Customer> {
  @Field({ nullable: true })
  @Length(2, 50)
  name?: string;

  @Field({ nullable: true })
  @Length(2, 50)
  email?: string;

  @Field({ nullable: true })
  @Length(2, 20)
  phone?: string;

  @Field({ nullable: true })
  @Length(2, 15)
  hash_pwd?: string;
}
