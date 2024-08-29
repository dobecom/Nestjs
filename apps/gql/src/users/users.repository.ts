import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';

@Injectable()
export class UsersRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findUserByIdOrName(id: number, name?: string): Promise<User> {
    let condition = '';
    let bindNum = 0;
    const params = [];

    if (name) {
      params.push(name);
      condition = `AND name = $${++bindNum}`;
    }
    params.push(id);

    let sql = `SELECT id, name, email, status FROM users WHERE id = $${++bindNum} ${condition}`;
    const [result] = await this.dataSource.query(sql, params);

    return result;
  }

  async findUsers(skip: number, take: number): Promise<User[]> {
    const result = await this.dataSource.query(
      `SELECT id, name, email, status FROM users ORDER BY id LIMIT $1 OFFSET $2`,
      [take, skip]
    );

    return result;
  }

  async create(data: NewUserInput): Promise<User> {
    const [result] = await this.dataSource.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, status`,
      [data.name, data.email]
    );

    return result;
  }

  async updateUser(user: User): Promise<User> {
    const { id, name, email } = user;

    await this.dataSource.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    return user;
  }
  async deleteUser(id: number): Promise<void> {
    await this.dataSource.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
