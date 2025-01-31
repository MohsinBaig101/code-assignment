# Code Assignment

Welcome to the code assignment! This project is based on the `create-t3-turbo` starter kit, which provides a monorepo setup with Next.js, tRPC, and more. Please follow the instructions below to set up the development environment and deploy your work.

If you encounter any issues with the setup, refer to the original repository for troubleshooting: [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

---

### If you're applying for a full-stack role:
Goal is to implement the functionality of commenting on posts. 

- Explore `packages/api` and `packages/db`.

  1. **Minimal Feature Scope**: Ensure a basic version (backend & frontend) of commenting is functional and tested in a way that you would be comfortable to ship the feature. 

  2. **ß

- Work iteratively until all tests pass and tasks are successfully implemented.


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
