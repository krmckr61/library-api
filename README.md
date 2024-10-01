# Library REST API

## Installation

### Copy the environments

    cp .env.example .env

### Start Database container

    docker-compose up -d --build database

### Run Migrations

    npx prisma migrate dev

    (This will generates the db structure)

### Insert Seeds

    npx prisma db seed

    This will insert example data in (bookType, author, book, user) with ordered ids as 1,2,3,4,5

    Also these data will use in tests

### Run Tests

    npm run test

### Start Api Server

    npm run start:dev

### Congrats!, To Access Swagger Documentation

    http://localhost:3000/docs
