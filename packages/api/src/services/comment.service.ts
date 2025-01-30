import { PostCommentsRepository } from "../repositories/comment.repository";
import type { IGetCommentQueryArgs } from "../interfaces/internal";
import Container, { Service } from "typedi";

@Service()
export class PostCommentsService {
    private postCommentsRepository: PostCommentsRepository;

    constructor() {
        // Retrieve an instance of PostCommentsRepository from the DI container
        this.postCommentsRepository = Container.get(PostCommentsRepository);
    }

    /**
     * Fetches comments for a specific post.
     * Supports pagination using cursor-based pagination.
     *
     * @param input - Object containing postId, limit, optional cursor, and optional parentId
     * @returns A paginated list of comments and the next cursor
     */
    async getComments(input: {
        id: string;
        limit: number;
        cursor?: number;
        parentId?: string;
    }) {
        const { cursor, limit, id, parentId } = input;

        const queryArgs: IGetCommentQueryArgs = {
            take: limit + 1, // Fetch one extra item to determine if there's a next page
            where: {
                postId: id,
                parentId: parentId ?? null, // Fetch root comments if no parentId is provided
                ...(cursor && { incrementalId: { lte: cursor } }), // Apply cursor-based pagination
            },
            orderBy: { incrementalId: "desc" }, // Sort by incremental ID in descending order
            include: { _count: { select: { replies: true } } }, // Include reply count
        };

        const items = await this.postCommentsRepository.getAllComments(queryArgs);

        // Determine next cursor for pagination
        const nextCursor = items.length > limit ? items.pop()?.incrementalId ?? null : null;

        return { items, nextCursor };
    }

    /**
     * Creates a new comment for a post.
     *
     * @param postId - The ID of the post
     * @param content - The content of the comment
     * @returns The created comment object
     */
    async createComment(postId: string, content: string) {
        return this.postCommentsRepository.createComment(postId, content, null);
    }

    /**
     * Stores a reply to an existing comment.
     *
     * @param postId - The ID of the post
     * @param parentId - The ID of the parent comment
     * @param content - The content of the reply
     * @returns The created reply object
     */
    async storeReply(postId: string, parentId: string, content: string) {
        return this.postCommentsRepository.createComment(postId, content, parentId);
    }
}
