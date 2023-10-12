![image](https://github.com/dobecom/Nestjs/assets/90499822/ec0461a4-a40b-418c-ad47-db43d7e464b2)# Nestjs playground project

This is my Nestjs project for improvement skills

Here are the things that you could follow…

1. Mono repository [ Main app, MSA, Task Scheduler, Common Library for Mono repo ]
2. Blockchain [ Smart Contract ]
3. DDD hexagonal (Simple Version, only applied for “users” module)
https://github.com/Sairyss/domain-driven-hexagon/blob/master/assets/images/DomainDrivenHexagon.png![image](https://github.com/dobecom/Nestjs/assets/90499822/8e36e9e1-c78b-432c-931c-6a1dbbef50c3)

4. Kafka (KRaft)
5. Google OAuth
6. Prisma ORM
7. Filter & Interceptor
8. Redis
9. JWT Guard
10. CLS (Continuous Local Storage; It’s DX improvement from ALS)

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

## [Feature 1] Kafka for MSA

- Installation
1. Run Docker container from Dockerfile (Location : /containers/kafka/Dockerfile)

```bash
// comment : build a docker image from the Dockerfile
docker build ./containers/kafka/ -t kraft:1.0

// comment : run docker a container from the docker image
docker run -it --name kraft -p 9092:9092 kraft:1.0 /bin/bash

// comment : run the Kafka server
cd /home/user/kafka_2.13-3.5.0
bin/kafka-server-start.sh config/kraft/server.properties

// comment : open another command prompt
docker exec -it "container_id" /bin/bash

// comment : create a Kafka topic (Replace the topic name that you want to create by replace "quickstart-events" [ex: "test-event"])
bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

1. Run msa-findbook application

```bash
npm run start:msa-findbook
```

1. Request a GET request to the main app’s controller (localhost:3333/books/find) 
- Reference

[https://velog.io/@dobecom/Kafka-서버-구성하기](https://velog.io/@dobecom/Kafka-%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0)

## [Feature 2] Blockchain Smart Contract

…

## [Feature 3] …

…

## Additional Information

Others are developed referred by Nestjs official documentation.

## References

1. DDD hexagonal

https://github.com/Sairyss/domain-driven-hexagon

1. Kafka

https://kafka.apache.org/documentation/#quickstart

1. My Blog

https://velog.io/@dobecom
