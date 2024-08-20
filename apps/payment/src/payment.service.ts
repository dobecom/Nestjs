import { Pays } from '@app/common/models/domains/pays.domain';
import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly repository: PaymentRepository) {}

  // async createPayment(data) {
  //   const { userId, orderList } = data;
  //   try {
  //     const description =
  //       orderList
  //         .map((order, index) => {
  //           if (index < 3) return order.title;
  //         })
  //         .join(', ') + `등 ${orderList.length}개의 주문`;

  //     const result = await this.paymentRepository.save({
  //       title: `${new Date().getTime().toString()}_${userId}`,
  //       description,
  //       user: {
  //         id: userId,
  //       },
  //     });
  //     return result;
  //   } catch (err) {
  //     throw new RpcException(err);
  //   }
  // }

  async modifyPay(pays: Pays) {
    const result = await this.repository.updatePay(pays);
    return {
      pays: {
        id: result,
      },
    };
  }

  async modifyCancelPay(pays: Pays) {
    const result = await this.repository.updateCancelPay(pays);
    return {
      pays: {
        id: result,
      },
    };
  }
}
