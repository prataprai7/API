import { HttpException } from "../exceptions/http-exception";
import { CreateBlogDTO } from "../dtos/blog.dto";
import { BlogMongoRepository } from "../repositories/blog.repository";
const blogRepository = new BlogMongoRepository();

export class BlogService {
    async createBlog(blogData: CreateBlogDTO) {
        const createdBlog = await blogRepository.createBlog(blogData);
        return createdBlog;   
    }
    async getBlogsByAuthorId(authorId: string) {
        const blogs = await blogRepository.getBlogByAuthorId(authorId);
        return blogs;
    }
    async getPaginatedBlogs(page: string, limit: string, search?: string) {
        const currentPage = parseInt(page, 10);
        const currentLimit = parseInt(limit, 10);
        const blogs = await blogRepository.getPaginatedBlogs(currentPage, currentLimit, search);
        return blogs;
    }
}