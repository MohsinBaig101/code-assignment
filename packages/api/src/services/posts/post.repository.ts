// /packages/services/posts/post.repository.ts

import { prisma } from "@inf/db";
import type { Post } from "@prisma/client";

export class PostRepository {
    // Fetch all posts
    async getAll(): Promise<Post[]> {
        return prisma.post.findMany();
    }

    // Fetch a single post by ID
    async getById(id: string): Promise<Post | null> {
        return prisma.post.findUnique({
            where: { id },
        });
    }

    // Create a new post
    async create(data: { title: string; content: string; author_id: string }): Promise<Post> {
        return prisma.post.create({
            data,
        });
    }

    // Update a post
    async update(id: string, data: { title: string; content: string }): Promise<Post> {
        return prisma.post.update({
            where: { id },
            data,
        });
    }

    // Delete a post
    async delete(id: string): Promise<Post> {
        return prisma.post.delete({
            where: { id },
        });
    }
}
