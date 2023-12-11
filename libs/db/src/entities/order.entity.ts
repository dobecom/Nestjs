import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { PaymentEntity } from './payment.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne((type) => PaymentEntity, (payment) => payment.orders)
  payment: PaymentEntity;
}
