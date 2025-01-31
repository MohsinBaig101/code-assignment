### 1. Steps to Run the Application - (Full Stack Developer Assessment)

Make sure you have [PNPM](https://pnpm.io/) installed globally on your machine.

```bash

# Clone the Repo: 
git clone https://github.com/MohsinBaig101/code-assignment.git

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
  - Change the DATABASE_URL path in the .env file.
# Make sure you have PostgreSQL on your local machine.

# Push the database schema
pnpm run db:push

# Run the build
pnpm run build

# Start the Server
pnpm run start

```

## Side Note:
We can deploy the code using a Docker container and deploy it on Kubernetes, AWS ECS, and other platforms.

As part of the assessment, I have completed the required work.
