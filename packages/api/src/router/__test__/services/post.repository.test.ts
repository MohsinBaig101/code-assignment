/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { describe, it, expect, vi } from 'vitest';
import { PostRepository } from '../../../services/posts/post.repository';
import { prisma } from '@inf/db'; // Assuming prisma is imported from here

describe('PostRepository', () => {
    let postRepository: PostRepository;

    beforeEach(() => {
        postRepository = new PostRepository();

        // Mocking prisma methods using vi.fn()
        vi.spyOn(prisma.post, 'findMany').mockResolvedValue([]);
        vi.spyOn(prisma.post, 'findUnique').mockResolvedValue(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vi.spyOn(prisma.post, 'create').mockResolvedValue({} as any);
        vi.spyOn(prisma.post, 'update').mockResolvedValue({} as any);
        vi.spyOn(prisma.post, 'delete').mockResolvedValue({} as any);
    });

    it('should fetch all posts', async () => {
        const mockPosts = [
            {
                id: '1',
                title: 'Post 1',
                content: 'Content 1',
                author_id: 'author1',
                published: true, // Add missing fields
                created_at: new Date('2025-01-01T00:00:00Z'),
                updated_at: new Date('2025-01-01T00:00:00Z')
            },
        ];


        vi.spyOn(prisma.post, 'findMany').mockResolvedValue(mockPosts);

        const posts = await postRepository.getAll();

        expect(posts).toEqual(mockPosts);
        expect(prisma.post.findMany).toHaveBeenCalledOnce();
    });

    it('should fetch a post by ID', async () => {
        const mockPost ={ 
                id: '1', 
                title: 'Post 1', 
                content: 'Content 1', 
                author_id: 'author1',
                published: true, // Add missing fields
                created_at: new Date('2025-01-01T00:00:00Z'),
                updated_at: new Date('2025-01-01T00:00:00Z')
            }
    
        vi.spyOn(prisma.post, 'findUnique').mockResolvedValue(mockPost);

        const post = await postRepository.getById('1');

        expect(post).toEqual(mockPost);
        expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should create a new post', async () => {
        const newPost ={
            title: 'Post 1', 
            content: 'Content 1', 
            author_id: 'author1',
            published: true, // Add missing fields
            created_at: new Date('2025-01-01T00:00:00Z'),
            updated_at: new Date('2025-01-01T00:00:00Z')
        }
        const createdPost = { id: '2', ...newPost };

        vi.spyOn(prisma.post, 'create').mockResolvedValue(createdPost);

        const post = await postRepository.create(newPost);

        expect(post).toEqual(createdPost);
        expect(prisma.post.create).toHaveBeenCalledWith({ data: newPost });
    });

    it('should update a post', async () => {
        const updatedData = { title: 'Updated Post', content: 'Updated Content' };
        const updatedPost = { id: '1', ...updatedData, author_id: 'author1' };

        vi.spyOn(prisma.post, 'update').mockResolvedValue(updatedPost as any);

        const post = await postRepository.update('1', updatedData);

        expect(post).toEqual(updatedPost);
        expect(prisma.post.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedData,
        });
    });

    it('should delete a post', async () => {
        const deletedPost = { id: '1', title: 'Post 1', content: 'Content 1', author_id: 'author1' };

        vi.spyOn(prisma.post, 'delete').mockResolvedValue(deletedPost as any);

        const post = await postRepository.delete('1');

        expect(post).toEqual(deletedPost);
        expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
});
