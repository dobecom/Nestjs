import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { StorageContractAbi } from './abis/storage-contract.abi';

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService, StorageContractAbi],
})
export class BlockchainModule {}
