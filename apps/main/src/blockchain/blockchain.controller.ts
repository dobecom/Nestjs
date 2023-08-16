import { Body, Controller, Get, Post} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ContractRequest } from './dto/contract.request.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('contract')
  async retrieveContractData() {
    // get contract data ref by Remix Smart Contract Example(Storage.sol)
    return this.blockchainService.callRetrieveFunction();
  }

  @Post('contract')
  async setContractData(@Body() value: ContractRequest){
    // set contract data
    return this.blockchainService.callStoreFunction(value);
  }
}
