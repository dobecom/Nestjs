import { Injectable } from '@nestjs/common';
import {
  ContractAbiInOut,
  StateMutability,
} from '../interfaces/contract-abi.interface';

@Injectable()
export class StorageContractAbi {
  // sample data for the test (Storage.sol Smart Contract)
  private readonly abi = [];

  constructor() {
    this.initializeAbi();
  }

  private initializeAbi() {
    this.abi.push({
      inputs: [
        {
          internalType: 'uint256',
          name: 'num',
          type: 'uint256',
        } as ContractAbiInOut,
      ],
      name: 'store',
      outputs: [],
      stateMutability: StateMutability.nonpayable,
      type: 'function',
    });
    this.abi.push({
      inputs: [],
      name: 'retrieve',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        } as ContractAbiInOut,
      ],
      stateMutability: StateMutability.view,
      type: 'function',
    });
  }

  getAbi() {
    return this.abi;
  }
}
