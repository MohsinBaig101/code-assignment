// /packages/services/posts/post.service.ts

import { PostRepository } from "./post.repository";

const postRepository = new PostRepository();

export class PostService {
    async getAllPosts() {
        return postRepository.getAll();
    }

    async getPostById(id: string) {
        return postRepository.getById(id);
    }

    async createPost(title: string, content: string, author_id: string) {
        return postRepository.create({ title, content, author_id });
    }

    async updatePost(id: string, title: string, content: string) {
        return postRepository.update(id, { title, content });
    }

    async deletePost(id: string) {
        return postRepository.delete(id);
    }
}
