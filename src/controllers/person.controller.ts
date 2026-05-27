import { Request, Response } from "express";
import { data } from "../models/person.model";
import { HttpException } from "../exceptions/http-exception";
import { ApiResponseHelper } from "../utils/api-response";
import { CreatePersonDTO } from "../dtos/person.dto";
import { z } from "zod";
import { PersonService } from "../services/person.service";

const personService = new PersonService();

export class PersonController {
    // 1. GET - get all
    async getAllPerson(req: Request, res: Response) {
        // later paginated results
        try {
            return ApiResponseHelper.success(res, data, 200, "Success"); // consistent api response
        } catch (err: Error | unknown | any) {
            return ApiResponseHelper.error(
                res, 
                err?.message || "Failed to get", 
                err.status || 500
            );
        }
    }

    // efficient api design 
    // 1. logic through exception handling
    // 2. consistent api response
    // 3. global error handling middleware
    async createPerson(req: Request, res: Response) {
        const parseResult = CreatePersonDTO.safeParse(req.body);
        if(!parseResult.success){
            throw new HttpException(
                400, 
                z.prettifyError(parseResult.error)
            );
        }
        const newPerson = personService.createPerson(parseResult.data);
        return ApiResponseHelper.success(res, newPerson, 201, "Person created");
    }

    // create a function updatePerson
    // 1. find person by id, if not found 
    // throw 404 with message "Person not found"
    // 2. if name or age is not provided in request body,
    // default to existing person's name and age
    // 3. update the person's name and age with request body
    // 4. return the updated person with consistent api response
    // 5. implement in router -> /api/persons/:id [PUT]
    // contd. (NEW)
    // Use Zod implementation for validation UpdatePersonDTO
    // Change update to repositories and services
    // 1. in repository, create update function that takes id and Partial<Person>
    // 2. in service, create updatePerson function that takes id and UpdatePersonDTO
    // 2.1 - validate if id exists, if not throw 404
    // 2.2 - validate if name is not "admin", if not throw 403
    // 2.3 - call repository update function with id and update data
    // 3. in controller, call service updatePerson function and return response
}