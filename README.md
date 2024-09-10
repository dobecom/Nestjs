# Nestjs project

This is my NestJS project for skill improvement

Here are the things that you could follow…

1. Mono repository [ Main app, MSA, Task Scheduler, Common Library for Mono repo ]
2. Blockchain [ Smart Contract ]
3. RabbitMQ (Examples for queue, pub/sub, routing, topics, RPC)
4. Google OAuth
5. TypeORM
6. Filter & Interceptor
7. Redis
8. JWT Guard
9. CLS (Continuous Local Storage; It’s DX improvement from ALS)

## Getting Started

Instructions for downloading and running the project in a local environment.

### Installation

1. Clone this repository.
    
    ```
    git clone https://github.com/dobecom/Nestjs.git
    ```
    
2. Install the necessary packages.
    
    ```
    npm install
    ```
    
3. Create .env file by copying “.env.example” file

### Usage

1. After installation, run the following command in the project root directory.
    
    ```bash
    // Run Main application
    npm run start
    
    // Run Task scheduler
    npm run start:scheduler
    
    // Run MSA
    npm run start:msa-findbook
    ```
    
2. Your Nestjs server will be running at `http://localhost:3333`.

## [Feature 1] RabbitMQ for MSA
1. Run gateway and microservices application

```bash
npm run start:dev gateway
npm run start:dev auth
npm run start:dev payment
npm run start:dev ...
```

2. An example for the GET request that is getting response (localhost:3333/payment) 


## [Feature 2] Blockchain Smart Contract

1. Create your own Metamask wallet

[https://metamask.io](https://metamask.io/)

2. Get some free **SepoliaETH** into your wallet

[https://sepoliafaucet.com](https://sepoliafaucet.com/)

3. Deploy the example smart contract on Remix and get the contract address

https://remix.ethereum.org/

4. Set the .env property “BLOCKCHAIN_CONTRACT_ADDRESS” from your contract address
5. Create your own Infura node

[https://www.infura.io](https://www.infura.io/)

6. Set the .env property “BLOCKCHAIN_INFURA_API_KEY” and “BLOCKCHAIN_ACCOUNT_PRIVATE_KEY” from your Infura node

## Additional Information

Others are developed referred by Nestjs official documentation.

## References

1. DDD hexagonal

https://github.com/Sairyss/domain-driven-hexagon

2. Kafka

https://kafka.apache.org/documentation/#quickstart

3. My Blog

https://velog.io/@dobecom
