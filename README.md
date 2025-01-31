### 1. To run the code, please follow the below steps.

Make sure you have [PNPM](https://pnpm.io/) installed globally on your machine.

```bash

# Clone the Repo: 
git clone https://github.com/MohsinBaig101/code-assignment.git

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
  - Change the DATABASE_URL path in .env file

# Push the database schema
pnpm run db:push

# Run the build
pnpm run build

# Start the Server
pnpm run start

```
