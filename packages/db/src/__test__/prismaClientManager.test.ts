import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PrismaClientManager } from '../prismaClientManager'; // Adjust the import path as needed
import { PrismaClient } from '@prisma/client';

// Mock PrismaClient class
vi.mock('@prisma/client', () => {
    return {
        PrismaClient: vi.fn(() => ({
            $connect: vi.fn(),
            $disconnect: vi.fn(),
        })),
    };
});

describe('PrismaClientManager', () => {
    let originalEnv;

    beforeEach(() => {
        // Save original NODE_ENV
        globalThis.prisma = undefined;
        originalEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
        // Restore original NODE_ENV after each test
        process.env.NODE_ENV = originalEnv;
        vi.clearAllMocks();
    });

    it('should create a new PrismaClient instance in production if not already created', () => {
        process.env.NODE_ENV = 'production';

        // First call
        const client1 = PrismaClientManager.client;
        const client2 = PrismaClientManager.client;

        // Assert that PrismaClient is instantiated only once
        expect(PrismaClient).toHaveBeenCalledTimes(1);
        expect(client1).toBe(client2); // Both should refer to the same instance
    });

    it("should create a new PrismaClient instance in development and set it globally", () => {
        process.env.NODE_ENV = 'development';

        // First call: PrismaClient should be instantiated
        const client1 = PrismaClientManager.client;
        const client2 = PrismaClientManager.client;

        // Assert that PrismaClient is instantiated only once
        expect(PrismaClient).toHaveBeenCalledTimes(1); // PrismaClient should only be called once

        // Both clients should refer to the same instance
        expect(client1).toBe(client2);

        // Check if PrismaClient was set globally
        expect(globalThis.prisma).toBe(client1);
    });

    it('should use the global PrismaClient instance in development', () => {
        process.env.NODE_ENV = 'development';

        // First call
        const client1 = PrismaClientManager.client;
        // Set a new global prisma instance
        const newPrismaInstance = new PrismaClient();
        globalThis.prisma = newPrismaInstance;

        // Call client again, it should return the globally set instance
        const client2 = PrismaClientManager.client;

        // Assert that the globally set PrismaClient instance is used
        expect(client2).toBe(newPrismaInstance);
    });

    it('should call $connect when connect method is called', async () => {
        process.env.NODE_ENV = 'development';
        const client = PrismaClientManager.client;

        // Call connect method
        await PrismaClientManager.connect();

        // Assert that $connect was called on the PrismaClient instance
        expect(client.$connect).toHaveBeenCalled();
    });

    it('should call $disconnect when disconnect method is called', async () => {
        process.env.NODE_ENV = 'development';
        const client = PrismaClientManager.client;

        // Call disconnect method
        await PrismaClientManager.disconnect();

        // Assert that $disconnect was called on the PrismaClient instance
        expect(client.$disconnect).toHaveBeenCalled();
    });
});
