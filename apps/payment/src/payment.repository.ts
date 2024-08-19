import { Pays } from '@app/common/models/domains/pays.domain';
import { PaysEntity } from '@app/common/models/entities/pays.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaysEntity)
    private readonly payRepository: Repository<PaysEntity>
  ) {}

  async updatePay(pays: Pays) {
    try {
      console.log('pays');
      console.log(pays);
      const paysEntity = new PaysEntity();
      paysEntity.id = pays.id;
      paysEntity.name = pays.name;
      paysEntity.status = pays.status;
      const queryBuilder = this.payRepository
        .createQueryBuilder()
        .update(PaysEntity)
        .set({
          name: paysEntity.name,
          ...(paysEntity.status !== undefined && {
            status: () => `status + ${paysEntity.status}`,
          }),
        })
        .where('id = :id', { id: paysEntity.id })
        .returning('id');
      const result = await queryBuilder.execute();
      const updatedId = result.raw[0].id;

      return +updatedId;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
