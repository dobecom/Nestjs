import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(
    @Inject('BLOCKCHAIN_SERVICE') private blockchainCp: ClientProxy
  ) {}

  @Get()
  getWalletAddress(@AuthUser() user: any) {
    try {
      this.blockchainCp.emit('blockchain-list', {
        userId: user.id,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
