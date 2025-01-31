import { describe, it, expect, vi } from 'vitest';
import { PostCommentsRepository } from '../../repositories/comment.repository';
import { prisma } from '@inf/db'; // Assuming prisma is imported from here

describe('PostCommentRepository', () => {
    let postCommentRepository: PostCommentsRepository;

    beforeEach(() => {
        postCommentRepository = new PostCommentsRepository();

        // Mocking prisma methods using vi.fn()
        vi.spyOn(prisma.comment, 'findMany').mockResolvedValue([]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        vi.spyOn(prisma.comment, 'create').mockResolvedValue({} as any);
    });

    it('should fetch all comments by postId', async () => {
        const mockComments = [
            {
                id: "1",
                incrementalId: 100,
                content: "This is a sample content",
                postId: "abc123",
                parentId: null, // Assign null or a valid parent ID
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null, // Assign null or a valid date if deleted
            }
        ];


        vi.spyOn(prisma.comment, 'findMany').mockResolvedValue(mockComments);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        const comments = await postCommentRepository.getAllComments({} as any);

        expect(comments).toEqual(mockComments);
    });

    it('should create a new comment', async () => {
        const newComment = {
            content: 'Content 1',
            parentId: null,
            postId: "4"
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        vi.spyOn(prisma.comment, 'create').mockResolvedValue(newComment as any);

        await postCommentRepository.createComment(newComment.postId, newComment.content, null);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(prisma.comment.create).toHaveBeenCalled();
    });
});
