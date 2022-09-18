import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('Customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ length: 20 })
  @Unique('UC_Customer', ['email'])
  phone: string;

  @Column()
  hash_pwd: string;
}
