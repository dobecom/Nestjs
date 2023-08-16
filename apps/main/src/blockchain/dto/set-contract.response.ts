import { ApiResponseProperty } from '@nestjs/swagger';

export class SetContractResponse {
  @ApiResponseProperty({
    example: '0xe88fd9fd0d19451890d79f41ea3ba2757d9342485580f19cfd490dc64bc31163',
  })
  transactionHash: string;
}
