import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate } from 'typeorm';
import { CommonEntity } from './common.entity';
// import { Comment } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity extends CommonEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  body: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date;
  }

  @Column('simple-array')
  tagList: string[];

  @ManyToOne(type => UserEntity, user => user.orders)
  buyer: UserEntity;

  // @OneToMany(type => Comment, comment => comment.article, {eager: true})
  // @JoinColumn()
  // comments: Comment[];

  @Column({default: 0})
  favoriteCount: number;
}