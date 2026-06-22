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
    async getPaginatedBlogs(page?: string, limit?: string, search?: string) {
        const currentPage = page ? parseInt(page, 10) : 1;
        const currentLimit = limit ? parseInt(limit, 10) : 10;
        const {data, total} = await blogRepository.getPaginatedBlogs(currentPage, currentLimit, search);
        const totalPages = Math.ceil(total / currentLimit);
        return {
            data,
            pagination: {
                total,
                page: currentPage,
                limit: currentLimit,
                totalPages
            }
        };
    }
}