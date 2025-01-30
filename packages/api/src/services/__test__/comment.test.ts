import { expect } from "chai";
import sinon from "sinon";
import { PostCommentsService } from "../comment.service";
import { PostCommentsRepository } from "../../repositories/comment.repository";
import { Container } from "typedi";

describe("PostCommentsService", () => {
    let postCommentsService: PostCommentsService;
    let postCommentsRepositoryStub: sinon.SinonStubbedInstance<PostCommentsRepository>;

    beforeEach(() => {
        // Create the stub for PostCommentsRepository
        postCommentsRepositoryStub = sinon.createStubInstance(PostCommentsRepository);

        // Replace the actual repository in the service with the stub
        Container.set(PostCommentsRepository, postCommentsRepositoryStub);

        // Instantiate the PostCommentsService
        postCommentsService = new PostCommentsService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getComments", () => {
        it("should return comments and nextCursor when there are more than 'limit' comments", async () => {
            const input = {
                id: "123",
                limit: 2,
                cursor: 5
            };

            const mockComments = [
                { incrementalId: 10, content: "Comment 1", postId: "123", id: "1", parentId: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
                { incrementalId: 8, content: "Comment 2", postId: "123", id: "2", parentId: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
                { incrementalId: 6, content: "Comment 3", postId: "123", id: "3", parentId: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            ];

            // Setup the stub to return the mockComments
            postCommentsRepositoryStub.getAllComments.resolves(mockComments);

            const result = await postCommentsService.getComments(input);

            expect(result.items).to.have.lengthOf(2); // Check that 3 comments were returned
            expect(result.nextCursor).to.equal(6);  // Check that the next cursor is the incrementalId of the last comment
        });

        it("should return comments without nextCursor when there are no more than 'limit' comments", async () => {
            const input = {
                id: "123",
                limit: 2,
                cursor: 5,
            };

            const mockComments = [
                { incrementalId: 6, content: "Comment 1", postId: "123", id: "1", parentId: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
                { incrementalId: 4, content: "Comment 2", postId: "123", id: "2", parentId: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            ];

            // Setup the stub to return the mockComments
            postCommentsRepositoryStub.getAllComments.resolves(mockComments);

            const result = await postCommentsService.getComments(input);

            expect(result.items).to.have.lengthOf(2); // Check that 2 comments were returned
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(result.nextCursor).to.be.null; // Check that nextCursor is null as no more comments are available
        });
    });

    describe("createComment", () => {
        it("should call createComment in the repository", async () => {
            const postId = "123";
            const content = "New comment content";

            // Return a mock comment object with the correct structure
            const mockComment = {
                id: "1",
                incrementalId: 1,
                content,
                postId,
                parentId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };

            // Setup the stub for createComment method to return the mockComment
            postCommentsRepositoryStub.createComment.resolves(mockComment);

            const result = await postCommentsService.createComment(postId, content);

            expect(result).to.deep.equal(mockComment); // Verify the return value matches the mockComment structure
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(postCommentsRepositoryStub.createComment.calledOnceWith(postId, content, null)).to.be.true;
        });
    });

    describe("storeReply", () => {
        it("should call createComment in the repository with parentId", async () => {
            const postId = "123";
            const parentId = "456";
            const content = "Reply content";

            // Return a mock comment object with the correct structure
            const mockComment = {
                id: "2",
                incrementalId: 2,
                content,
                postId,
                parentId,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };

            // Setup the stub for createComment method to return the mockComment
            postCommentsRepositoryStub.createComment.resolves(mockComment);

            const result = await postCommentsService.storeReply(postId, parentId, content);

            expect(result).to.deep.equal(mockComment); // Verify the return value matches the mockComment structure
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(postCommentsRepositoryStub.createComment.calledOnceWith(postId, content, parentId)).to.be.true;
        });
    });
});
