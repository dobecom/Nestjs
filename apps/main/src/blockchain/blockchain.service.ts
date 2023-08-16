import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { StorageContractAbi } from './abis/storage-contract.abi';
import { ContractRequest } from './dto/contract.request.dto';

@Injectable()
export class BlockchainService {
  private web3: Web3;
  constructor(private readonly storageContractAbi : StorageContractAbi) {
    const nodeUrl =
      `https://sepolia.infura.io/v3/${process.env.BLOCKCHAIN_INFURA_API_KEY}`;
    this.web3 = new Web3(nodeUrl);
  }

  async callStoreFunction(request : ContractRequest) {
    try {
      // check current block number
      // const blockNumber = await this.web3.eth.getBlockNumber();
      // console.log(`Current block number: ${blockNumber}`);

      const pvKey = process.env.BLOCKCHAIN_ACCOUNT_PRIVATE_KEY;
      const account = await this.web3.eth.accounts.privateKeyToAccount('0x' + pvKey);
      const nonce = await this.web3.eth.getTransactionCount(account.address);

      const contract = await new this.web3.eth.Contract(this.storageContractAbi.getAbi(), process.env.BLOCKCHAIN_CONTRACT_ADDRESS);
      const functionData = await contract.methods.store(request.value).encodeABI();
      const txObject = {
        from: account.address,
        to: process.env.BLOCKCHAIN_CONTRACT_ADDRESS,
        data: functionData,
        gas: 2000000, // Adjust gas limit as needed
        gasPrice: this.web3.utils.toWei('100', 'gwei'), // Adjust gas price as needed
        nonce: nonce,
      };

      const signedTx = await this.web3.eth.accounts.signTransaction(
        txObject,
        pvKey
      );

      const receipt = await this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log('Transaction receipt:', receipt);
      return receipt.transactionHash;
    } catch (err) {
      console.log(err);
    }
  }

  async callRetrieveFunction() {
    try {
      const result = await new this.web3.eth.Contract(
        this.storageContractAbi.getAbi(),
        process.env.BLOCKCHAIN_CONTRACT_ADDRESS
      );
      const resultData = await result.methods['retrieve']().call();
      return resultData;
    } catch (err) {
      console.log(err);
    }
  }
}
