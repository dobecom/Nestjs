import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('pays')
export class PayEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int8' })
  userId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Index()
  @Column({ type: 'smallint', default: 0 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.pays, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
