import { Body, Controller, Get, Post} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';
import { ContractRequest } from './dto/contract.request.dto';
import { RetrieveContractResponse } from './dto/retrieve-contract.response';

@ApiTags('Blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @ApiOperation({
    summary: 'Retrieve contract data',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: RetrieveContractResponse,
  })
  @ApiResponse({
    status: 500,
    content: {
      'application/json': {
        examples: {
          INTERNAL_SERVER_ERROR: {
            value: {
              errorCode: 'E11',
              message: 'Internal Server Error : Error Message',
            },
          },
        },
      },
    },
  })
  @Get('contract')
  async retrieveContractData() {
    // get contract data ref by Remix Smart Contract Example(Storage.sol)
    return this.blockchainService.callRetrieveFunction();
  }

  @ApiOperation({
    summary: 'Set contract data',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: RetrieveContractResponse,
  })
  @ApiResponse({
    status: 500,
    content: {
      'application/json': {
        examples: {
          INTERNAL_SERVER_ERROR: {
            value: {
              errorCode: 'E11',
              message: 'Internal Server Error : Error Message',
            },
          },
        },
      },
    },
  })
  @Post('contract')
  async setContractData(@Body() value: ContractRequest){
    // set contract data
    return this.blockchainService.callStoreFunction(value);
  }
}
