import { expect } from 'chai';
import sinon from 'sinon';
import { PostService } from '../../posts/post.service';
import { PostRepository } from '../../posts/post.repository';
import { Container } from '../../../lib/dContainer';

describe('PostService', () => {
    let postService: PostService;
    let postRepositoryStub: sinon.SinonStubbedInstance<PostRepository>;

    beforeEach(() => {
        // Stub PostRepository methods
        postRepositoryStub = sinon.createStubInstance(PostRepository);

        // Mocking DI container to return the stubbed PostRepository
        Container.get = sinon.stub().returns(postRepositoryStub);

        // Create a new instance of PostService, which uses the stubbed repository
        postService = new PostService();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call getAll on PostRepository when getAllPosts is called', async () => {
        postRepositoryStub.getAll.resolves([]);

        await postService.getAllPosts();

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(postRepositoryStub.getAll.calledOnce).to.be.true;
    });

    it('should call getById on PostRepository when getPostById is called', async () => {
        const postId = '1';
        const post = {
            id: postId,
            title: 'Test Post',
            content: 'This is a test post.',
            published: true,
            created_at: new Date(),
            updated_at: new Date(),
            author_id: 'author1'
        };
        postRepositoryStub.getById.resolves(post);

        await postService.getPostById(postId);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(postRepositoryStub.getById.calledOnceWith(postId)).to.be.true;
    });

    it('should call create on PostRepository when createPost is called', async () => {
        const title = 'New Post';
        const content = 'Post Content';
        const author_id = 'author1';
        const post = {
            id: '1', // assuming the post has an id after creation
            title: 'New Post',
            content: 'Post Content',
            published: false, // Assuming default value for published
            created_at: new Date(),
            updated_at: new Date(),
            author_id: 'author1'
        };
        postRepositoryStub.create.resolves(post);

        await postService.createPost(title, content, author_id);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(postRepositoryStub.create.calledOnceWith({ title, content, author_id })).to.be.true;
    });

    it('should call update on PostRepository when updatePost is called', async () => {
        const postId = '1';
        const title = 'Updated Post';
        const content = 'Updated Content';
        const post = {
            id: '1', // assuming the post has an id after creation
            title: 'Updated Post',
            content: 'Updated Content',
            published: false, // Assuming default value for published
            created_at: new Date(),
            updated_at: new Date(),
            author_id: 'author1'
        };
        postRepositoryStub.update.resolves(post);

        await postService.updatePost(postId, title, content);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(postRepositoryStub.update.calledOnceWith(postId, { title, content })).to.be.true;
    });

    it('should call delete on PostRepository when deletePost is called', async () => {
        const postId = '1';
        const post = {
            id: '1', // assuming the post has an id after creation
            title: 'Updated Post',
            content: 'Updated Content',
            published: false, // Assuming default value for published
            created_at: new Date(),
            updated_at: new Date(),
            author_id: 'author1'
        };
        postRepositoryStub.delete.resolves(post);

        await postService.deletePost(postId);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(postRepositoryStub.delete.calledOnceWith(postId)).to.be.true;
    });
});
