import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { OrderEntity } from './order.entity';
import { CommonEntity } from './common.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({default: 'https://sample.png'})
  image: string;

  @Column()
  password: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   const salt = await bcrypt.genSalt();
  //   this.password = await bcrypt.hash(this.password, salt);
  // }

//   @ManyToMany(type => ArticleEntity)
//   @JoinTable()
//   favorites: ArticleEntity[];

  @OneToMany(type => OrderEntity, order => order.buyer)
  orders: OrderEntity[];
}