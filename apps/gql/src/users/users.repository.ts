import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NewUserInput } from './dto/new-user.input';
import { UserOutput } from './dto/user.output';

@Injectable()
export class UsersRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOneByIdOrName(
    id: number,
    name?: string
  ): Promise<UserOutput | null> {
    const params = [];
    params.push(id);
    let condition = 'id = $1';

    if (name) {
      condition += ` OR name = $2`;
      params.push(name);
    }

    const sql = `SELECT id, name, email, status FROM users WHERE ${condition}`;
    const [result] = await this.dataSource.query(sql, params);

    return result || null;
  }

  async findUsers(skip: number, take: number): Promise<UserOutput[]> {
    const result = await this.dataSource.query(
      `SELECT id, name, email, status FROM users ORDER BY id LIMIT $1 OFFSET $2`,
      [take, skip]
    );

    return result;
  }

  async create(data: NewUserInput): Promise<UserOutput> {
    const [result] = await this.dataSource.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, status`,
      [data.name, data.email]
    );

    return result;
  }

  async updateUser(user: UserOutput): Promise<UserOutput> {
    const { id, name, email } = user;

    const [updatedUser] = await this.dataSource.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, status',
      [name, email, id]
    );

    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.dataSource.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
