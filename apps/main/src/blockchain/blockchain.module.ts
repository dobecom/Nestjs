import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { StorageContractAbi } from './abis/storage-contract.abi';
import { ConfigEnvService } from 'libs/common/src/config/config-env.service';

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService, StorageContractAbi, ConfigEnvService],
})
export class BlockchainModule {}
