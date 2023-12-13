import { EventPattern, Payload } from '@nestjs/microservices';
import { BlockchainService } from './blockchain.service';

export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @EventPattern('blockchain-list')
  getListPayment(@Payload() data) {
    return 'blockchain-list';
  }


  // @ApiOperation({
  //   summary: 'Retrieve contract data',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Success',
  //   schema: { type: 'number', example: 10 },
  // })
  // @ApiResponse({
  //   status: 500,
  //   content: {
  //     'application/json': {
  //       examples: {
  //         GET_CONTRACT_ERR: {
  //           value: {
  //             errorCode: 'Err1501',
  //             message: 'Failed to get the contract',
  //           },
  //         },
  //         CALL_CONTRACT_ERR: {
  //           value: {
  //             errorCode: 'Err1502',
  //             message: 'Failed to call the contract method',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // @Get('contract')
  // async retrieveContractData() {
  //   // get contract data ref by Remix Smart Contract Example(Storage.sol)
  //   return this.blockchainService.callRetrieveFunction();
  // }

  // @ApiOperation({
  //   summary: 'Set contract data',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Success',
  //   type: SetContractResponse,
  // })
  // @ApiResponse({
  //   status: 500,
  //   content: {
  //     'application/json': {
  //       examples: {
  //         INTERNAL_SERVER_ERROR: {
  //           value: {
  //             errorCode: 'E11',
  //             message: 'Internal Server Error : Error Message',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // @Post('contract')
  // async setContractData(@Body() value: ContractRequest) {
  //   // set contract data
  //   return this.blockchainService.callStoreFunction(value);
  // }
}
