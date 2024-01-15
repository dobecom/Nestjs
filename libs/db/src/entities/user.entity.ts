import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { CommonEntity } from './common.entity';
import { PaymentEntity } from './payment.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Index({ unique: true})
  @Column()
  email: string;

  @Column({ default: 'https://sample.png' })
  image: string;

  @Column()
  password: string;

  @OneToMany((type) => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany((type) => PaymentEntity, (payment) => payment.user)
  payments: PaymentEntity[];
}
