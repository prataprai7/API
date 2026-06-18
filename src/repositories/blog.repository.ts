import BlogModel, {IBlog} from '../models/blog.model';

export interface IBlogRepository{
    createBlog(blogData: any):Promise<IBlog>;
}

export class BlogMongoRepository implements IBlogRepository{
    async createBlog(blogData: any): Promise<IBlog> {
        const blog = new BlogModel(blogData);
        await blog.save();
        return blog;

    }

}