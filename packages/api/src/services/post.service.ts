import { PostRepository } from "../repositories/post.repository";
import { Container } from '../lib/dContainer';  // Import the DI container
import { Service } from "typedi";

@Service()
export class PostService {
  private postRepository: PostRepository;

  constructor() {
    // Retrieve an instance of PostRepository from the DI container
    this.postRepository = Container.get(PostRepository);
  }

  /**
   * Fetches all posts.
   * 
   * @returns A list of all posts
   */
  async getAllPosts() {
    return this.postRepository.getAll();
  }

  /**
   * Fetches a specific post by its ID.
   * 
   * @param id - The ID of the post
   * @returns The post object if found, otherwise null
   */
  async getPostById(id: string) {
    return this.postRepository.getById(id);
  }

  /**
   * Creates a new post.
   * 
   * @param title - The title of the post
   * @param content - The content of the post
   * @param author_id - The ID of the author
   * @returns The created post object
   */
  async createPost(title: string, content: string, author_id: string) {
    return this.postRepository.create({ title, content, author_id });
  }

  /**
   * Updates an existing post.
   * 
   * @param id - The ID of the post to update
   * @param title - The new title of the post
   * @param content - The new content of the post
   * @returns The updated post object
   */
  async updatePost(id: string, title: string, content: string) {
    return this.postRepository.update(id, { title, content });
  }

  /**
   * Deletes a post by its ID.
   * 
   * @param id - The ID of the post to delete
   * @returns A success message or error if the post was not found
   */
  async deletePost(id: string) {
    return this.postRepository.delete(id);
  }
}
