### 1. Steps to Run the Application - (Full Stack Role Assessment)

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

### UI Screenshots
<img width="953" alt="image" src="https://github.com/user-attachments/assets/662082c1-93cd-4729-8a82-1691b8d523d1" />
<img width="938" alt="image" src="https://github.com/user-attachments/assets/1a4e54ab-b1a7-4a14-9481-325a9607c005" />
<img width="957" alt="image" src="https://github.com/user-attachments/assets/c924f8aa-492c-47a2-9e7a-dafc9b79031a" />
<img width="944" alt="image" src="https://github.com/user-attachments/assets/b9bdb572-48f7-4e3e-8580-c8ccd0d31e8c" />
<img width="553" alt="image" src="https://github.com/user-attachments/assets/aefa482d-2bca-4cfb-8f32-b40738f8183f" />



