# Code Assignment

Welcome to the code assignment! This project is based on the `create-t3-turbo` starter kit, which provides a monorepo setup with Next.js, tRPC, and more. Please follow the instructions below to set up the development environment and deploy your work.

If you encounter any issues with the setup, refer to the original repository for troubleshooting: [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

---

## Getting Started

### 1. Install Dependencies

Make sure you have [PNPM](https://pnpm.io/) installed globally on your machine.

```bash
# Clone the Repo
git clone https://github.com/MohsinBaig101/code-assignment.git

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Make sure you have the PostgreSQL and update the Connection string in the Environment file.
DATABASE_URL

# Push the database schema
pnpm run db:push

# Run the Server
pnpm run dev
```


