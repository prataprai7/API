import BlogModel, { IBlog } from "../models/blog.model";
export interface IBlogRepository {
    createBlog(blogData: any): Promise<IBlog>;
    getBlogByAuthorId(authorId: string): Promise<IBlog[]>;
    getPaginatedBlogs(page: number, limit: number, search?: string): Promise<IBlog[]>;
}

export class BlogMongoRepository implements IBlogRepository {
    async createBlog(blogData: any): Promise<IBlog> {
        const blog = new BlogModel(blogData);
        await blog.save();
        return blog;
    }
    async getBlogByAuthorId(authorId: string): Promise<IBlog[]> {
        const blogs = await BlogModel
            .find({authorId: authorId as any})
            .populate("authorId", "firstName lastName email");
        return blogs;
    }
    async getPaginatedBlogs(page: number, limit: number, search?: string): Promise<IBlog[]> {
        const skip = (page - 1) * limit;
        const query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }
        const blogs = await BlogModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .populate("authorId", "firstName lastName email");
        return blogs;
    }
}