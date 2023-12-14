import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { nanoid } from 'nanoid';
const amqp = require('amqplib/callback_api');

// rmq exchange type
enum ExchangeType {
  FANOUT = 'fanout',
  DIRECT = 'direct',
  TOPIC = 'topic',
  HEADERS = 'headers',
}

@UseGuards(AuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(
    private config: ConfigService,
    @Inject('BLOCKCHAIN_SERVICE') private blockchainCp: ClientProxy
  ) {}
  private logger = new Logger(BlockchainController.name);
  private severity = ['info', 'warning', 'error'];

  handleExchange = () => {
    amqp.connect(
      `amqp://${this.config.get('RABBITMQ_USER')}:${this.config.get(
        'RABBITMQ_PW'
      )}@${this.config.get('BROKER_HOST')}:${this.config.get('BROKER_PORT')}`,
      (err, connection) => {
        if (err) {
          throw new InternalServerErrorException(err);
        }
        connection.createChannel((chErr, ch) => {
          if (chErr) {
            throw new InternalServerErrorException(chErr);
          }
          const queueName = 'hello';
          const selectedSeverity = this.severity[1];
          const data = {
            title: `Hello world, ${selectedSeverity}`,
          };

          /* Queue process */
          // ch.assertQueue(queueName, { durable: false });
          // ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

          /* Publish/Subscribe process */
          // ch.assertExchange(queueName, ExchangeType.FANOUT, { durable: false });
          // // the meaning of second param is not assigning to specific queue
          // ch.publish(queueName, '', Buffer.from(JSON.stringify(data)));
          // this.logger.log(`Sent ${JSON.stringify(data)}`, );

          /* Routing process */
          // ch.assertExchange(queueName, ExchangeType.DIRECT, {
          //   durable: false
          // });
          // ch.publish(queueName, selectedSeverity, Buffer.from(JSON.stringify(data)));
          // this.logger.log(`Sent ${JSON.stringify(data)}`, );

          /* RPC process */
          ch.assertQueue(
            '',
            {
              exclusive: true,
            },
            (queueErr, q) => {
              if (queueErr) {
                throw new InternalServerErrorException(queueErr);
              }
              var correlationId = nanoid(10);
              this.logger.log(`[x] Requesting [id:${correlationId}]`);

              ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
                correlationId: correlationId,
                replyTo: q.queue,
              });
              ch.consume(
                q.queue,
                (msg) => {
                  if (msg.properties.correlationId == correlationId) {
                    this.logger.log(`[.] Got ${msg.content.toString()}`);
                  }
                },
                {
                  noAck: true,
                }
              );
            }
          );
        });
      }
    );
  };

  @Get()
  handleSomething(@AuthUser() user: any) {
    try {
      this.handleExchange();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
}
