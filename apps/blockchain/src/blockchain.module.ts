import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { StorageContractAbi } from './abis/storage-contract.abi';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [BlockchainController],
  providers: [BlockchainService, StorageContractAbi],
})
export class BlockchainModule {}
