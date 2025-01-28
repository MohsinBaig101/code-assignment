import { PostRepository } from "./post.repository";
import { Container } from '../../lib/dContainer';  // Import the DI container
import { Service } from "typedi";

@Service()
export class PostService {
  private postRepository: PostRepository
  constructor() {
    this.postRepository = Container.get(PostRepository);
  }

  async getAllPosts(){
    return this.postRepository.getAll();
  }

  async getPostById(id: string) {
    return this.postRepository.getById(id);
  }

  async createPost(title: string, content: string, author_id: string) {
    return this.postRepository.create({ title, content, author_id });
  }

  async updatePost(id: string, title: string, content: string) {
    return this.postRepository.update(id, { title, content });
  }

  async deletePost(id: string){
    return this.postRepository.delete(id);
  }
}
