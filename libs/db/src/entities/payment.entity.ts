import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity('payment')
export class PaymentEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany((type) => OrderEntity, (order) => order.payment)
  orders: OrderEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.payments)
  user: UserEntity;
}
