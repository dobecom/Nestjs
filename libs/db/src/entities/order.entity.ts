import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // @BeforeUpdate()
  // updateTimestamp() {
  //   this.updated = new Date;
  // }

  // @Column('simple-array')
  // tagList: string[];

  @ManyToOne((type) => UserEntity, (user) => user.orders)
  buyer: UserEntity;

  // @OneToMany(type => Comment, comment => comment.article, {eager: true})
  // @JoinColumn()
  // comments: Comment[];

  // @Column({default: 0})
  // favoriteCount: number;
}
