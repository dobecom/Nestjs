import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnvService } from '@app/common/env/env.service';
import Web3 from 'web3';
import { StorageContractAbi } from './abis/storage-contract.abi';
import { ContractRequest } from './dto/request/contract.request';

@Injectable()
export class BlockchainService {
  private web3: Web3;
  constructor(
    private readonly storageContractAbi: StorageContractAbi,
    private readonly envService: EnvService
  ) {
    const nodeUrl = `https://sepolia.infura.io/v3/${this.envService.get(
      'BLOCKCHAIN_INFURA_API_KEY'
    )}`;
    this.web3 = new Web3(nodeUrl);
  }

  async callStoreFunction(request: ContractRequest) {
    try {
      // check current block number
      // const blockNumber = await this.web3.eth.getBlockNumber();
      // console.log(`Current block number: ${blockNumber}`);

      const pvKey = this.envService.get('BLOCKCHAIN_ACCOUNT_PRIVATE_KEY');
      const account = await this.web3.eth.accounts.privateKeyToAccount(
        '0x' + pvKey
      );
      const nonce = await this.web3.eth.getTransactionCount(account.address);

      const contract = await new this.web3.eth.Contract(
        this.storageContractAbi.getAbi(),
        this.envService.get('BLOCKCHAIN_CONTRACT_ADDRESS')
      );

      // const functionData = await contract.methods
      //   .store(request.value)
      //   .encodeABI();

      // const txObject = {
      //   from: account.address,
      //   to: this.envService.get('BLOCKCHAIN_CONTRACT_ADDRESS')

      //   data: functionData,
      //   gas: 2000000, // Adjust gas limit as needed
      //   gasPrice: this.web3.utils.toWei('100', 'gwei'), // Adjust gas price as needed
      //   nonce: nonce,
      // };

      // const signedTx = await this.web3.eth.accounts.signTransaction(
      //   txObject,
      //   pvKey
      // );

      // const receipt = await this.web3.eth.sendSignedTransaction(
      //   signedTx.rawTransaction
      // );

      // // console.log('Transaction receipt:', receipt);

      // return { transactionHash: receipt.transactionHash };
    } catch (err) {
      throw err;
    }
  }

  async callRetrieveFunction() {
    try {
      const contract = await new this.web3.eth.Contract(
        await this.storageContractAbi.getAbi(),
        this.envService.get('BLOCKCHAIN_CONTRACT_ADDRESS')
      );
      // example 1 for exception filter & swagger
      if (!contract) {
        throw new InternalServerErrorException({
          errorCode: 'Err1501',
          message: 'Failed to get the contract',
        });
      }

      const resultData = await contract.methods['retrieve']().call();
      // example 2 for exception filter & swagger
      if (!resultData) {
        throw new InternalServerErrorException({
          errorCode: 'Err1502',
          message: 'Failed to call the contract method',
        });
      }

      return +resultData.toString();
    } catch (err) {
      throw err;
    }
  }
}
