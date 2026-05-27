import z from "zod";
import { UserSchema } from "../types/user.type";
// what client sends and need to validate before processing
export const CreateUserDto = UserSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    username: true,
    password: true,
});
export type CreateUserDto = z.infer<typeof CreateUserDto> ;

// Exception Handler
export class HttpException extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}