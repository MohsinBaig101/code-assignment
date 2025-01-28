import { PrismaClient } from "@prisma/client";

// Extend the global object in development to keep the Prisma Client instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export class PrismaClientManager {
  private static instance: PrismaClient;

  // Use the static instance property to ensure a singleton pattern
  static get client(): PrismaClient {
    if (process.env.NODE_ENV === "production") {
      if (!this.instance) {
        this.instance = new PrismaClient();
      }
      return this.instance;
    }

    // In non-production environments (like dev or test), use the global instance to avoid
    // multiple instances of Prisma Client.
    if (globalThis.prisma) {
      return globalThis.prisma;
    }

    this.instance = new PrismaClient();
    globalThis.prisma = this.instance; // Store instance globally for dev
    return this.instance;
  }

  // Optional: Define connect and disconnect methods for manual control
  static async connect() {
    if (!this.instance) {
      this.instance = new PrismaClient();
    }
    await this.instance.$connect();
  }

  static async disconnect() {
    await this.instance.$disconnect();
  }
}

// Export the Prisma Client
export const prisma = PrismaClientManager.client;
