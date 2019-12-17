# Simple Teller API

## Project description

this repository build for POC (Prof of concept) of nest.js as a high-performance and light weight back-end framework on simple transactional flow.

## Running project in development mode

1. Create database called `simple-bank` on your postgres database
2. Configure your database connection on app.module.ts and ormconfig.json _note: this duplication will fix in the future_
3. Run database migration using `npm run typeorm:migration:run`
4. Build the project using `npm run build`
5. Run the project using `npm run start:dev`

## Available module

- Account Module `/account`
