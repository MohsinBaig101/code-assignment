import { prisma } from "@inf/db";
import type { Post } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class PostRepository {
    /**
     * Fetches all posts.
     * 
     * @returns A list of all posts.
     */
    async getAll(): Promise<Post[]> {
        return prisma.post.findMany();
    }

    /**
     * Fetches a single post by its ID.
     * 
     * @param id - The ID of the post.
     * @returns The post object if found, otherwise null.
     */
    async getById(id: string): Promise<Post | null> {
        return prisma.post.findUnique({
            where: { id },
        });
    }

    /**
     * Creates a new post.
     * 
     * @param data - An object containing title, content, and author_id.
     * @returns The created post object.
     */
    async create(data: { title: string; content: string; author_id: string }): Promise<Post> {
        return prisma.post.create({
            data,
        });
    }

    /**
     * Updates an existing post.
     * 
     * @param id - The ID of the post to update.
     * @param data - An object containing the new title and content.
     * @returns The updated post object.
     */
    async update(id: string, data: { title: string; content: string }): Promise<Post> {
        return prisma.post.update({
            where: { id },
            data,
        });
    }

    /**
     * Deletes a post by its ID.
     * 
     * @param id - The ID of the post to delete.
     * @returns The deleted post object.
     */
    async delete(id: string): Promise<Post> {
        return prisma.post.delete({
            where: { id },
        });
    }
}
