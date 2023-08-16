import { ApiResponseProperty } from '@nestjs/swagger';

export class RetrieveContractResponse {
  @ApiResponseProperty({
    example: 100,
  })
  value: number;
}
