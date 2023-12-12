export interface ContractAbi {
    inputs: ContractAbiInOut[];
    name: string;
    outputs: ContractAbiInOut[];
    stateMutability: StateMutability;
    type: string;
}

export interface ContractAbiInOut {
    internalType: string;
    name: string;
    type: string;
}

export enum StateMutability {
    nonpayable = 'nonpayable',
    view = 'view'
}