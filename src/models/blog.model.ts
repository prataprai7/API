import { Schema, model, Document } from "mongoose";
import { BlogType } from "../types/blog.type";
export interface IBlog extends 
    Omit<BlogType, 'authorId'>,  // to match ObjectId, remove authorId from BlogType
    Document {
        authorId: Schema.Types.ObjectId; // authorId in db
}
const BlogModelSchema: Schema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    {
        timestamps: true,
    }
);
export default model<IBlog>(
    "Blog",
    BlogModelSchema
);